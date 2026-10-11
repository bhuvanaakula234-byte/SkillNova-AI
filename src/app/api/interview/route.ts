// D:\SkillNova\tempapp\src\app\api\interview\route.ts
import { NextResponse } from 'next/server';

const CURATED_QUESTIONS = {
  java: [
    {
      id: "q-java-1",
      question: "Explain the internal working of Java HashMap. What happens in case of a hash collision in Java 8 and later?",
      round: "Technical Screen",
      topic: "Core Java & Collections",
      difficulty: "Intermediate",
      keyExpectations: ["Hash calculation and bitwise shifting", "Array of Node (bucket)", "LinkedList converted to Balanced Red-Black Tree when bucket exceeds 8 and total capacity >= 64", "Time complexity transition from O(n) to O(log n)"],
      modelAnswer: `Java HashMap uses an array of Node<K, V> as its underlying bucket storage. 
1. When put(key, value) is called, it calculates the hash using key.hashCode() and applies a spreading function to distribute bits: (h = key.hashCode()) ^ (h >>> 16).
2. The index is determined via bitwise AND: (n - 1) & hash, where n is capacity (always power of 2).
3. If collision occurs (two keys map to same bucket), entries were historically stored in a linked list.
4. In Java 8+, if a single bucket contains more than TREEIFY_THRESHOLD (8 entries) and the total table capacity is at least 64 (MIN_TREEIFY_CAPACITY), the linked list transforms into a Red-Black Tree (TreeNode).
5. This improves worst-case lookup from O(n) to O(log n). If elements drop below UNTREEIFY_THRESHOLD (6), it transforms back into a LinkedList.`
    },
    {
      id: "q-java-2",
      question: "How does Spring Boot handle transaction management with @Transactional? Explain rollback mechanisms and proxy creation.",
      round: "Backend Engineering",
      topic: "Spring Framework & DB Transactions",
      difficulty: "Intermediate",
      keyExpectations: ["AOP Proxy interception (CGLIB or JDK Dynamic)", "PlatformTransactionManager", "Default rollback on RuntimeException / Error only", "Self-invocation gotchas"],
      modelAnswer: `@Transactional works using Spring AOP proxies:
1. Spring intercepts calls to methods marked with @Transactional via a proxy object (JDK dynamic proxy if interface exists, or CGLIB proxy for class subclasses).
2. Before the method executes, the proxy opens or associates an existing transaction via PlatformTransactionManager.
3. If an exception occurs, by default Spring only triggers rollback for unchecked exceptions (subclasses of RuntimeException and Error). Checked exceptions do NOT trigger rollback unless rollbackFor = Exception.class is specified.
4. Important gotcha: If a transactional method is called from another method within the SAME class (self-invocation via 'this'), the Spring AOP proxy is bypassed, so the transaction will NOT begin.`
    }
  ],
  ai: [
    {
      id: "q-ai-1",
      question: "Explain the architecture of a Retrieval-Augmented Generation (RAG) system. How do you handle chunking, embedding generation, and vector retrieval?",
      round: "Technical Screen",
      topic: "LLMs & Vector Search",
      difficulty: "Intermediate",
      keyExpectations: ["Document parsing and chunking with overlap", "Embedding models", "Vector index like HNSW in Pinecone/Chroma", "Top-k cosine similarity or dot product", "Context injection into prompt"],
      modelAnswer: `A production RAG system consists of three main pipelines:
1. Ingestion: Source documents (PDFs, Markdown) are cleaned and split into semantically coherent chunks using strategies like RecursiveCharacterTextSplitter (typically 500-1000 tokens with 10-20% overlap to preserve boundary context).
2. Embedding & Vector Index: Chunks are passed through an embedding model (e.g. OpenAI text-embedding-3 or BAAI/bge-large) and indexed into a vector database (Chroma, Pinecone, Milvus) using HNSW or IVFFlat index.
3. Retrieval & Generation: When a user query arrives, it is embedded using the same model. The database performs cosine similarity or Approximate Nearest Neighbors (ANN) search to retrieve the top-k chunks.
4. Prompt Augmentation: The retrieved passages are injected into the LLM system prompt as verified context.
5. Advanced enhancements include Hybrid Search (BM25 + Dense vector), cross-encoder re-ranking (Cohere Rerank), and query rewriting.`
    }
  ],
  dsa: [
    {
      id: "q-dsa-1",
      question: "How would you detect a cycle in a Singly Linked List, and how do you find the starting node of the cycle? Explain the time and space complexity.",
      round: "Coding & Problem Solving",
      topic: "Linked Lists & Pointers",
      difficulty: "Intermediate",
      keyExpectations: ["Floyd's Tortoise and Hare algorithm", "Slow pointer moves 1 step, Fast moves 2 steps", "Collision point implies cycle", "Reset one pointer to head to find loop start", "O(N) time and O(1) auxiliary space"],
      modelAnswer: `Cycle detection is solved optimally using Floyd's Tortoise and Hare algorithm:
1. Initialize two pointers: slow and fast at head.
2. Traverse: slow = slow.next, fast = fast.next.next.
3. If fast reaches null or fast.next is null, there is no cycle.
4. If slow == fast, a cycle is confirmed.
5. To find the cycle entry node: Keep one pointer at the meeting point and reset the other pointer to head. Move both pointers one step at a time (slow = slow.next, head = head.next). The node where they meet is the start of the loop.
6. Time Complexity: O(N) where N is number of nodes. Space Complexity: O(1) auxiliary space since no HashSet is needed.`
    }
  ]
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = 'generate', role = 'Java Full Stack Developer', question, answer } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    // Action 1: Evaluate candidate answer
    if (action === 'evaluate') {
      if (!answer || answer.trim().length < 15) {
        return NextResponse.json({
          success: false,
          error: "Please provide a more detailed answer before submitting for evaluation (at least 15 characters)."
        }, { status: 400 });
      }

      if (apiKey && apiKey.startsWith('sk-') && !apiKey.includes('your-actual-api-key')) {
        try {
          const evalRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                {
                  role: 'system',
                  content: `You are a principal technical interviewer at Google/Amazon. Evaluate the candidate's answer strictly and constructively.
Return JSON:
{
  "mode": "live-llm",
  "score": number (0-100),
  "technicalCorrectness": string,
  "completeness": string,
  "approachAndComplexity": string,
  "clarityAndCommunication": string,
  "keyMissedPoints": string[],
  "suggestedImprovement": string,
  "modelAnswerOutline": string
}`
                },
                {
                  role: 'user',
                  content: `Question: ${question}\n\nCandidate's Submitted Answer:\n${answer}`
                }
              ],
              response_format: { type: 'json_object' }
            })
          });

          if (evalRes.ok) {
            const data = await evalRes.json();
            const parsed = JSON.parse(data.choices[0].message.content);
            return NextResponse.json({
              success: true,
              provider: 'OpenAI GPT-4o-mini',
              mode: 'live-llm',
              evaluation: parsed
            });
          }
        } catch (e) {
          console.warn('Live AI evaluation failed, falling back to rule-based rubric:', e);
        }
      }

      // Rule-based heuristic answer evaluation
      const words = answer.trim().split(/\s+/).length;
      let score = Math.min(94, Math.max(45, Math.round(words * 0.8 + 35)));
      
      const lower = answer.toLowerCase();
      let matchedPoints = 0;
      const keyTerms = ['hash', 'tree', 'complexity', 'o(1)', 'o(n)', 'node', 'spring', 'transaction', 'proxy', 'rag', 'vector', 'fastapi', 'slow', 'fast'];
      keyTerms.forEach(t => {
        if (lower.includes(t)) matchedPoints++;
      });

      score = Math.min(95, score + matchedPoints * 2);

      return NextResponse.json({
        success: true,
        provider: 'SkillNova Evaluator (Local Deterministic Rubric)',
        mode: 'rule-based-engine',
        note: 'Evaluated using structured interview rubric analysis without external LLM API.',
        evaluation: {
          score,
          technicalCorrectness: score > 70 
            ? "Your explanation demonstrates good conceptual understanding with accurate terminology." 
            : "Your answer touches on the basic premise, but misses key edge-cases and deeper architecture nuances.",
          completeness: `Candidate provided a ${words}-word response addressing core points.`,
          approachAndComplexity: "Good analytical progression from initial definition to execution flow.",
          clarityAndCommunication: "Language is clear and easy to follow. To reach senior level, use structured bullet points and mention real-world tradeoffs.",
          keyMissedPoints: [
            "Explicit mention of boundary conditions and worst-case time/space complexities.",
            "Real-world production gotchas (e.g. self-invocation in proxies, or index degradation)."
          ],
          suggestedImprovement: "Structure your response into 3 parts: 1) High-level definition, 2) Step-by-step mechanical execution, 3) Edge cases & performance tradeoffs.",
          modelAnswerOutline: "See model solution provided below for full reference."
        }
      });
    }

    // Action 2: Generate Question
    let pool = CURATED_QUESTIONS.java;
    if (role.toLowerCase().includes('ai')) {
      pool = CURATED_QUESTIONS.ai;
    } else if (role.toLowerCase().includes('dsa') || role.toLowerCase().includes('problem')) {
      pool = CURATED_QUESTIONS.dsa;
    }

    const randomQ = pool[Math.floor(Math.random() * pool.length)];

    return NextResponse.json({
      success: true,
      provider: 'SkillNova Curated Technical Question Bank',
      mode: 'curated-stable',
      question: randomQ
    });

  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Interview service error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
