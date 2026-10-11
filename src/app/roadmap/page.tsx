'use client';

import { useState, useEffect } from 'react';
import StudentLayout from '@/components/StudentLayout';
import { IconCheck } from '@/components/Icons';

interface SubTopic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  resource: string;
}

interface RoadmapStage {
  id: string;
  stageNumber: number;
  title: string;
  prerequisites: string;
  concepts: string[];
  patterns: string;
  topics: SubTopic[];
}

const DSA_ROADMAP: RoadmapStage[] = [
  {
    id: "dsa-1",
    stageNumber: 1,
    title: "Programming Fundamentals & Complexity Analysis",
    prerequisites: "Basic syntax in Java, C++, or Python",
    concepts: ["Big-O, Big-Omega, Big-Theta notation", "Space versus time tradeoffs", "Best, average, worst case analysis"],
    patterns: "Iterative loops and recursion call tree analysis",
    topics: [
      { id: "dsa-1-1", name: "Time Complexity of Nested Loops", difficulty: "Easy", resource: "Complexity Verification" },
      { id: "dsa-1-2", name: "Space Complexity of Recursive Calls", difficulty: "Easy", resource: "Recursion Stack Basics" }
    ]
  },
  {
    id: "dsa-2",
    stageNumber: 2,
    title: "Arrays & Strings",
    prerequisites: "Memory allocation of contiguous arrays",
    concepts: ["Dynamic arrays", "Two Pointers technique", "Sliding Window", "Prefix Sum arrays"],
    patterns: "Opposite ends two pointers, fast and slow pointers, fixed/variable window",
    topics: [
      { id: "dsa-2-1", name: "Two Sum & 3Sum", difficulty: "Easy", resource: "LeetCode 1 and 15" },
      { id: "dsa-2-2", name: "Longest Substring Without Repeating Characters", difficulty: "Medium", resource: "LeetCode 3" },
      { id: "dsa-2-3", name: "Product of Array Except Self", difficulty: "Medium", resource: "LeetCode 238" }
    ]
  },
  {
    id: "dsa-3",
    stageNumber: 3,
    title: "Hashing & Basic Mathematics",
    prerequisites: "Arrays and modulo arithmetic",
    concepts: ["Hash functions", "Collision resolution (Chaining, Probing)", "Euclidean GCD", "Sieve of Eratosthenes"],
    patterns: "Frequency map counting and complement lookup",
    topics: [
      { id: "dsa-3-1", name: "Group Anagrams", difficulty: "Medium", resource: "LeetCode 49" },
      { id: "dsa-3-2", name: "Count Primes & Prime Factorization", difficulty: "Medium", resource: "LeetCode 204" }
    ]
  },
  {
    id: "dsa-4",
    stageNumber: 4,
    title: "Searching & Sorting",
    prerequisites: "Arrays and loops",
    concepts: ["Binary Search on 1D/2D arrays", "Merge Sort", "Quick Sort", "In-place partitioning"],
    patterns: "Binary search on monotonic answer space",
    topics: [
      { id: "dsa-4-1", name: "Search in Rotated Sorted Array", difficulty: "Medium", resource: "LeetCode 33" },
      { id: "dsa-4-2", name: "Kth Largest Element in an Array", difficulty: "Medium", resource: "LeetCode 215" }
    ]
  },
  {
    id: "dsa-5",
    stageNumber: 5,
    title: "Recursion & Backtracking",
    prerequisites: "Call stack mechanics",
    concepts: ["Base cases and recurrence relations", "Decision trees", "Pruning dead states"],
    patterns: "Choose, explore, unchoose pattern",
    topics: [
      { id: "dsa-5-1", name: "Subsets & Permutations", difficulty: "Medium", resource: "LeetCode 78 and 46" },
      { id: "dsa-5-2", name: "N-Queens & Sudoku Solver", difficulty: "Hard", resource: "LeetCode 51 and 37" }
    ]
  },
  {
    id: "dsa-6",
    stageNumber: 6,
    title: "Linked Lists",
    prerequisites: "Node references and pointer manipulation",
    concepts: ["Singly and Doubly Linked Lists", "Floyd's Tortoise and Hare", "In-place reversal"],
    patterns: "Dummy node head, slow and fast pointer runner",
    topics: [
      { id: "dsa-6-1", name: "Reverse Linked List", difficulty: "Easy", resource: "LeetCode 206" },
      { id: "dsa-6-2", name: "Linked List Cycle II (Loop Entrance)", difficulty: "Medium", resource: "LeetCode 142" }
    ]
  },
  {
    id: "dsa-7",
    stageNumber: 7,
    title: "Stacks & Queues",
    prerequisites: "Arrays and Linked Lists",
    concepts: ["LIFO vs FIFO properties", "Monotonic Stack", "Circular Queues", "Double-ended Queues"],
    patterns: "Next greater element, sliding window maximum",
    topics: [
      { id: "dsa-7-1", name: "Valid Parentheses", difficulty: "Easy", resource: "LeetCode 20" },
      { id: "dsa-7-2", name: "Daily Temperatures (Monotonic Stack)", difficulty: "Medium", resource: "LeetCode 739" }
    ]
  },
  {
    id: "dsa-8",
    stageNumber: 8,
    title: "Binary Trees & BST",
    prerequisites: "Recursion and pointers",
    concepts: ["DFS Pre, In, Post order traversals", "BFS Level-Order traversal", "BST Invariants", "Lowest Common Ancestor"],
    patterns: "Bottom-up recursion return values, top-down path passing",
    topics: [
      { id: "dsa-8-1", name: "Maximum Depth of Binary Tree", difficulty: "Easy", resource: "LeetCode 104" },
      { id: "dsa-8-2", name: "Lowest Common Ancestor in Binary Tree", difficulty: "Medium", resource: "LeetCode 236" }
    ]
  },
  {
    id: "dsa-9",
    stageNumber: 9,
    title: "Heaps & Priority Queues",
    prerequisites: "Binary Trees and array representations",
    concepts: ["Min-Heap and Max-Heap", "Heapify algorithm O(n)", "Top-K elements"],
    patterns: "Two heaps for running median, K-way merges",
    topics: [
      { id: "dsa-9-1", name: "Top K Frequent Elements", difficulty: "Medium", resource: "LeetCode 347" },
      { id: "dsa-9-2", name: "Find Median from Data Stream", difficulty: "Hard", resource: "LeetCode 295" }
    ]
  },
  {
    id: "dsa-10",
    stageNumber: 10,
    title: "Greedy Algorithms",
    prerequisites: "Sorting and priority queues",
    concepts: ["Greedy choice property", "Optimal substructure", "Interval scheduling"],
    patterns: "Sort by finish time or earliest start",
    topics: [
      { id: "dsa-10-1", name: "Jump Game & Jump Game II", difficulty: "Medium", resource: "LeetCode 55 and 45" },
      { id: "dsa-10-2", name: "Gas Station Circuit", difficulty: "Medium", resource: "LeetCode 134" }
    ]
  },
  {
    id: "dsa-11",
    stageNumber: 11,
    title: "Binary Search Patterns & Intervals",
    prerequisites: "Searching and sorting",
    concepts: ["Overlapping intervals merge", "Insert interval", "Min capacity binary search"],
    patterns: "Sort by start interval, check overlap condition",
    topics: [
      { id: "dsa-11-1", name: "Merge Intervals", difficulty: "Medium", resource: "LeetCode 56" },
      { id: "dsa-11-2", name: "Koko Eating Bananas", difficulty: "Medium", resource: "LeetCode 875" }
    ]
  },
  {
    id: "dsa-12",
    stageNumber: 12,
    title: "Graphs & Traversal Algorithms",
    prerequisites: "Trees, Queues, Recursion",
    concepts: ["Adjacency List/Matrix", "BFS and DFS", "Topological Sort (Kahn's)", "Dijkstra's Algorithm"],
    patterns: "Shortest path in unweighted graph, cycle detection, DAG ordering",
    topics: [
      { id: "dsa-12-1", name: "Number of Islands", difficulty: "Medium", resource: "LeetCode 200" },
      { id: "dsa-12-2", name: "Course Schedule (Topological Sort)", difficulty: "Medium", resource: "LeetCode 207" }
    ]
  },
  {
    id: "dsa-13",
    stageNumber: 13,
    title: "Dynamic Programming (DP)",
    prerequisites: "Recursion and Memoization",
    concepts: ["Overlapping subproblems", "Top-down memoization vs. Bottom-up tabulation", "1D/2D DP"],
    patterns: "0/1 Knapsack, Longest Common Subsequence, Interval DP",
    topics: [
      { id: "dsa-13-1", name: "Coin Change & House Robber", difficulty: "Medium", resource: "LeetCode 322 and 198" },
      { id: "dsa-13-2", name: "Longest Increasing Subsequence (LIS)", difficulty: "Medium", resource: "LeetCode 300" }
    ]
  },
  {
    id: "dsa-14",
    stageNumber: 14,
    title: "Tries & Advanced Structures",
    prerequisites: "Trees and Hash Tables",
    concepts: ["Prefix Tree / Trie", "Disjoint Set Union (Union-Find)", "Segment Trees"],
    patterns: "Prefix search, connected components with DSU",
    topics: [
      { id: "dsa-14-1", name: "Implement Trie (Prefix Tree)", difficulty: "Medium", resource: "LeetCode 208" },
      { id: "dsa-14-2", name: "Redundant Connection (Union-Find)", difficulty: "Medium", resource: "LeetCode 684" }
    ]
  },
  {
    id: "dsa-15",
    stageNumber: 15,
    title: "Mixed Interview Practice & Revision",
    prerequisites: "Stages 1 through 14 complete",
    concepts: ["Timed online assessment mock tests", "Edge cases and clean code", "Pattern recognition under timed pressure"],
    patterns: "Blind 75 mixed revision and interview mock sets",
    topics: [
      { id: "dsa-15-1", name: "Amazon SDE Mock Assessment 1", difficulty: "Hard", resource: "Timed Problem Set" },
      { id: "dsa-15-2", name: "Comprehensive Revision Checklist", difficulty: "Medium", resource: "Final Review" }
    ]
  }
];

const JAVA_ROADMAP = [
  { stage: 1, title: "Java Core & Object-Oriented Programming", topics: ["JVM, JRE, JDK internals", "Inheritance, Polymorphism, Abstraction, Encapsulation", "Garbage Collection & Memory Model"] },
  { stage: 2, title: "Collections Framework & Exception Handling", topics: ["List, Set, Map implementations", "Generics & Streams API", "Custom Exceptions & Try-with-resources"] },
  { stage: 3, title: "Data Structures & Problem Solving", topics: ["Core algorithm patterns in Java", "Big-O optimization", "LeetCode Java best practices"] },
  { stage: 4, title: "SQL & Relational Database Design", topics: ["PostgreSQL / MySQL normalization", "ACID transactions & Indexes", "Complex Joins & Aggregations"] },
  { stage: 5, title: "JDBC & Backend Fundamentals", topics: ["Connection pooling (HikariCP)", "PreparedStatement & SQL injection prevention", "DAO pattern"] },
  { stage: 6, title: "Spring Boot & RESTful APIs", topics: ["Dependency Injection & Spring IoC", "Spring MVC & Controller architectures", "Hibernate & Spring Data JPA", "Validation & Global Exception Handlers"] },
  { stage: 7, title: "Authentication & Security", topics: ["Spring Security 6 filters", "Stateless JWT token generation & validation", "Role-Based Access Control (RBAC)"] },
  { stage: 8, title: "Modern Frontend: React & TypeScript", topics: ["React 19 hooks", "Component state & Axios/Fetch API calls", "Responsive layout engineering"] },
  { stage: 9, title: "Testing, Git & Dockerization", topics: ["JUnit 5 & Mockito unit testing", "Git branching workflows", "Dockerfile creation & multi-stage builds"] },
  { stage: 10, title: "Enterprise Full-Stack Portfolio Projects", topics: ["Secure Banking Microservice", "Full-Stack Internship/Skill Portal"] },
  { stage: 11, title: "Interview Preparation & System Design", topics: ["Microservices architecture", "Caching with Redis", "Mock behavioral and system design rounds"] }
];

const AI_ROADMAP = [
  { stage: 1, title: "Python & Software Fundamentals", topics: ["Python 3 OOP, Generators & Decorators", "Virtual environments & package management", "Testing with PyTest"] },
  { stage: 2, title: "Linear Algebra, Probability & Statistics", topics: ["Vectors, Matrices & Eigenvalues", "Distributions, Hypothesis testing & Bayes Rule", "Gradient descent mechanics"] },
  { stage: 3, title: "Data Analysis & Numerical Computing", topics: ["NumPy vectorized computations", "Pandas DataFrame transformations", "Exploratory data analysis (EDA)"] },
  { stage: 4, title: "Machine Learning Fundamentals", topics: ["Supervised vs Unsupervised learning", "Regression, Decision Trees, Random Forests", "Scikit-Learn pipelines"] },
  { stage: 5, title: "Model Evaluation & Feature Engineering", topics: ["Cross-validation & Overfitting prevention", "Precision, Recall, F1-Score & ROC-AUC", "Feature scaling and encoding"] },
  { stage: 6, title: "Deep Learning Foundations", topics: ["Neural networks & Backpropagation", "PyTorch tensors & autograd", "CNNs & sequence models"] },
  { stage: 7, title: "LLMs & Prompt Engineering", topics: ["Transformer architecture basics", "Attention mechanism & tokenization", "Few-shot prompting and system steering"] },
  { stage: 8, title: "Embeddings, Vector Search & RAG", topics: ["Dense vector embeddings", "Vector DBs (ChromaDB, Pinecone, FAISS)", "Chunking strategies & Semantic hybrid search"] },
  { stage: 9, title: "AI Application Development & FastAPI", topics: ["Building REST APIs with FastAPI", "LangChain & LlamaIndex pipelines", "Streaming AI tokens with Server-Sent Events"] },
  { stage: 10, title: "Deployment, Evaluation & Portfolio", topics: ["Evaluating hallucinations and retrieval precision", "Containerized deployment with Docker", "End-to-end RAG assistant portfolio project"] }
];

export default function RoadmapPage() {
  const [activeCatalog, setActiveCatalog] = useState<'dsa' | 'java' | 'ai'>('dsa');
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('skillnova_roadmap_progress');
    if (saved) {
      try {
        setCompletedTopics(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse saved roadmap progress', e);
      }
    } else {
      const initial = { "dsa-1-1": true, "dsa-1-2": true, "dsa-2-1": true };
      setCompletedTopics(initial);
      localStorage.setItem('skillnova_roadmap_progress', JSON.stringify(initial));
    }
  }, []);

  const toggleTopic = (id: string) => {
    const updated = { ...completedTopics, [id]: !completedTopics[id] };
    setCompletedTopics(updated);
    localStorage.setItem('skillnova_roadmap_progress', JSON.stringify(updated));
  };

  const totalDsaTopics = DSA_ROADMAP.reduce((acc, stage) => acc + stage.topics.length, 0);
  const completedDsaCount = Object.keys(completedTopics).filter(k => k.startsWith('dsa-') && completedTopics[k]).length;
  const dsaPercent = Math.round((completedDsaCount / totalDsaTopics) * 100);

  return (
    <StudentLayout pageTitle="Learning Roadmaps">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
              Curated Roadmap Catalog
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.2rem' }}>
              Canonical, stable milestones that remain consistent across sessions and preserve your checkmarks.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DSA Progress:</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {completedDsaCount} / {totalDsaTopics} ({dsaPercent}%)
            </span>
          </div>
        </div>

        {/* Catalog Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem' }}>
          <button
            onClick={() => setActiveCatalog('dsa')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeCatalog === 'dsa' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeCatalog === 'dsa' ? 'var(--primary)' : 'var(--text-body)',
              fontWeight: activeCatalog === 'dsa' ? 600 : 500,
              fontSize: '0.875rem',
              padding: '0.55rem 0.9rem',
              cursor: 'pointer'
            }}
          >
            Curated 15-Stage DSA Roadmap
          </button>

          <button
            onClick={() => setActiveCatalog('java')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeCatalog === 'java' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeCatalog === 'java' ? 'var(--primary)' : 'var(--text-body)',
              fontWeight: activeCatalog === 'java' ? 600 : 500,
              fontSize: '0.875rem',
              padding: '0.55rem 0.9rem',
              cursor: 'pointer'
            }}
          >
            Java Full Stack Developer Track
          </button>

          <button
            onClick={() => setActiveCatalog('ai')}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: activeCatalog === 'ai' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeCatalog === 'ai' ? 'var(--primary)' : 'var(--text-body)',
              fontWeight: activeCatalog === 'ai' ? 600 : 500,
              fontSize: '0.875rem',
              padding: '0.55rem 0.9rem',
              cursor: 'pointer'
            }}
          >
            AI Engineer Track
          </button>
        </div>

        {/* Tab 1: Curated 15-Stage DSA Roadmap */}
        {activeCatalog === 'dsa' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {DSA_ROADMAP.map((stage) => {
              const stageDone = stage.topics.filter(t => completedTopics[t.id]).length;
              const allDone = stageDone === stage.topics.length;

              return (
                <div key={stage.id} className="card" style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-primary">Stage {stage.stageNumber}</span>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>{stage.title}</h3>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {stageDone} / {stage.topics.length} completed
                    </span>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginBottom: '1rem', fontSize: '0.825rem', color: 'var(--text-body)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Prerequisites:</strong> {stage.prerequisites}
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Concepts:</strong> {stage.concepts.join(', ')}
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text-heading)' }}>Patterns:</strong> {stage.patterns}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {stage.topics.map((t) => {
                      const isDone = !!completedTopics[t.id];
                      return (
                        <div
                          key={t.id}
                          onClick={() => toggleTopic(t.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: isDone ? 'var(--success-bg)' : '#FFFFFF',
                            border: isDone ? '1px solid var(--success-border)' : '1px solid var(--border-light)',
                            padding: '0.55rem 0.85rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <input
                              type="checkbox"
                              checked={isDone}
                              readOnly
                              style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '0.875rem', color: isDone ? 'var(--text-muted)' : 'var(--text-heading)', textDecoration: isDone ? 'line-through' : 'none', fontWeight: 500 }}>
                              {t.name}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>{t.difficulty}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.resource}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Java Full Stack Developer Track */}
        {activeCatalog === 'java' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {JAVA_ROADMAP.map((stage) => (
              <div key={stage.stage} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span className="badge badge-primary">Stage {stage.stage}</span>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>{stage.title}</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {stage.topics.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.55rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      &bull; {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: AI Engineer Track */}
        {activeCatalog === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {AI_ROADMAP.map((stage) => (
              <div key={stage.stage} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span className="badge badge-neutral">Stage {stage.stage}</span>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-heading)' }}>{stage.title}</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {stage.topics.map((item, idx) => (
                    <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '0.55rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                      &bull; {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </StudentLayout>
  );
}
