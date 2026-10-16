// src/data/mockSlides.js
export const mockSlides = [
  {
    id: 'slide-1',
    number: 1,
    title: 'Introduction to Java Collections',
    type: 'title',
    content: [
      'What is the Collections Framework?',
      'Why use Collections over raw arrays?',
      'Overview of the hierarchy',
    ],
    body: 'The Java Collections Framework provides a unified architecture for storing and manipulating groups of objects. It includes interfaces, implementations, and algorithms.',
    codeExample: null,
    trainerNotes: 'Start by asking students if they have used arrays in Java. Draw a contrast between arrays (fixed size) and collections (dynamic). Spend 3–4 minutes here — do not rush.',
    hasCode: false,
    verificationStatus: null,
    theme: 'dark',
    diagram: 'hierarchy',
  },
  {
    id: 'slide-2',
    number: 2,
    title: 'The Collection Interface Hierarchy',
    type: 'diagram',
    content: [
      'Iterable → Collection → List / Set / Queue',
      'Map is separate (does not extend Collection)',
      'Core interfaces define the contract',
    ],
    body: 'Understanding the hierarchy helps you choose the right data structure for the right use case.',
    codeExample: null,
    trainerNotes: 'Draw this on the whiteboard or use the diagram on this slide. Emphasize that Map is NOT a Collection — students often assume it is.',
    hasCode: false,
    verificationStatus: null,
    theme: 'dark',
    diagram: 'hierarchy',
  },
  {
    id: 'slide-3',
    number: 3,
    title: 'ArrayList — Dynamic Arrays',
    type: 'code',
    content: [
      'Backed by a resizable array',
      'O(1) access by index',
      'O(n) insert/delete in the middle',
      'Not thread-safe by default',
    ],
    body: 'ArrayList is the most commonly used List implementation. It excels at random access but struggles with frequent insertions and deletions in the middle.',
    codeExample: `import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        // Create a typed ArrayList
        List<String> fruits = new ArrayList<>();

        // Add elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");

        // Access by index — O(1)
        System.out.println(fruits.get(1)); // Banana

        // Iterate with enhanced for
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Remove by value
        fruits.remove("Banana");
        System.out.println("Size after remove: " + fruits.size()); // 2
    }
}`,
    trainerNotes: 'Walk through the code line by line. Emphasize that ArrayList uses generics — show what happens without <String> for context. Point out O(1) get vs O(n) remove.',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-4',
    number: 4,
    title: 'LinkedList — Doubly Linked',
    type: 'code',
    content: [
      'Each element stored as a node with prev/next pointers',
      'O(1) insert/delete at head or tail',
      'O(n) access by index',
      'Implements both List and Deque',
    ],
    body: 'LinkedList is efficient for frequent insertions and deletions but slower for index-based access compared to ArrayList.',
    codeExample: `import java.util.LinkedList;
import java.util.Deque;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();

        // Use as a List
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        // Use as a Deque (double-ended queue)
        numbers.addFirst(5);   // [5, 10, 20, 30]
        numbers.addLast(40);   // [5, 10, 20, 30, 40]

        System.out.println("First: " + numbers.peekFirst()); // 5
        System.out.println("Last:  " + numbers.peekLast());  // 40

        // Pop from front
        int head = numbers.pollFirst(); // removes 5
        System.out.println("Popped: " + head);
    }
}`,
    trainerNotes: 'Use a diagram to show the node chain. Contrast with ArrayList — when to use which. Mention that LinkedList implements Deque, making it useful for stacks and queues.',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-5',
    number: 5,
    title: 'HashMap — Key-Value Storage',
    type: 'code',
    content: [
      'Average O(1) get and put',
      'Backed by an array of buckets',
      'Keys must implement hashCode() and equals()',
      'Does not guarantee insertion order',
    ],
    body: 'HashMap is Java\'s primary key-value store, offering near-constant time performance for basic operations.',
    codeExample: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        // Insert key-value pairs
        scores.put("Alice", 95);
        scores.put("Bob",   78);
        scores.put("Carol", 88);

        // Retrieve — O(1) average
        System.out.println("Alice: " + scores.get("Alice")); // 95

        // Check key existence
        if (scores.containsKey("Bob")) {
            scores.put("Bob", scores.get("Bob") + 5); // update
        }

        // Iterate entries
        for (Map.Entry<String, Integer> e : scores.entrySet()) {
            System.out.printf("%s → %d%n", e.getKey(), e.getValue());
        }

        // getOrDefault
        int dana = scores.getOrDefault("Dana", 0);
        System.out.println("Dana: " + dana); // 0
    }
}`,
    trainerNotes: 'Explain hashing intuitively — buckets like post office boxes. Ask what happens with null keys (allowed once). Show getOrDefault as a modern idiomatic pattern.',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-6',
    number: 6,
    title: 'HashSet — Unique Elements',
    type: 'code',
    content: [
      'No duplicate elements allowed',
      'Backed by a HashMap internally',
      'O(1) add, remove, contains',
      'No guaranteed ordering',
    ],
    body: 'HashSet is perfect when you need to track unique items without caring about order.',
    codeExample: `import java.util.HashSet;
import java.util.Set;

public class HashSetDemo {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();

        tags.add("java");
        tags.add("collections");
        tags.add("java"); // duplicate — ignored!

        System.out.println("Size: " + tags.size()); // 2

        // Set operations
        Set<String> extra = new HashSet<>();
        extra.add("streams");
        extra.add("java");

        // Intersection
        Set<String> common = new HashSet<>(tags);
        common.retainAll(extra);
        System.out.println("Common: " + common); // [java]
    }
}`,
    trainerNotes: 'Show the duplicate-rejection behavior first — it always surprises beginners. Then demonstrate set theory operations (union, intersection, difference).',
    hasCode: true,
    verificationStatus: 'failed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-7',
    number: 7,
    title: 'Choosing the Right Collection',
    type: 'comparison',
    content: [
      'Need indexed access? → ArrayList',
      'Frequent head/tail ops? → LinkedList / ArrayDeque',
      'Unique items? → HashSet / LinkedHashSet',
      'Key-value lookup? → HashMap / LinkedHashMap',
      'Sorted order? → TreeMap / TreeSet',
    ],
    body: 'Choosing the correct implementation matters for performance. Use this decision guide as a quick reference.',
    codeExample: null,
    trainerNotes: 'Use this as a summary slide. Do NOT rush — let students think about which type fits their last exercise. This is where the learning consolidates.',
    hasCode: false,
    verificationStatus: null,
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-8',
    number: 8,
    title: 'Iterators and the for-each Loop',
    type: 'code',
    content: [
      'All Collections implement Iterable',
      'Iterator gives hasNext() + next()',
      'for-each is syntactic sugar for Iterator',
      'Use ListIterator for bidirectional traversal',
    ],
    body: 'Java\'s Iterator pattern provides a standard way to traverse any collection without exposing its internal structure.',
    codeExample: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Alpha");
        items.add("Beta");
        items.add("Gamma");

        // Traditional Iterator (safe removal)
        Iterator<String> it = items.iterator();
        while (it.hasNext()) {
            String item = it.next();
            if (item.equals("Beta")) {
                it.remove(); // safe — avoids ConcurrentModificationException
            }
        }

        // for-each (internally uses Iterator)
        for (String item : items) {
            System.out.println(item);
        }
    }
}`,
    trainerNotes: 'Highlight ConcurrentModificationException — many beginners hit this when trying to remove inside a for-each. Show the safe pattern using Iterator.remove().',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-9',
    number: 9,
    title: 'Collections Utility Class',
    type: 'code',
    content: [
      'java.util.Collections provides static helpers',
      'sort(), shuffle(), reverse(), swap()',
      'min(), max(), frequency()',
      'unmodifiableList(), synchronizedList()',
    ],
    body: 'The java.util.Collections class offers a rich set of utility methods that work with any Collection.',
    codeExample: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsUtilDemo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(
            List.of(42, 7, 19, 3, 88, 15)
        );

        Collections.sort(nums);
        System.out.println("Sorted: " + nums); // [3, 7, 15, 19, 42, 88]

        int min = Collections.min(nums);
        int max = Collections.max(nums);
        System.out.printf("Min=%d, Max=%d%n", min, max);

        Collections.shuffle(nums);
        System.out.println("Shuffled: " + nums);

        // Make read-only
        List<Integer> readOnly = Collections.unmodifiableList(nums);
        // readOnly.add(99); // throws UnsupportedOperationException
    }
}`,
    trainerNotes: 'Show each utility in a live demo. Unmodifiable collections are critical for defensive API design — make sure students understand the difference from List.of().',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-10',
    number: 10,
    title: 'Queue and Deque',
    type: 'code',
    content: [
      'Queue: FIFO — add to tail, remove from head',
      'Deque: double-ended — add/remove at both ends',
      'ArrayDeque is preferred over Stack class',
      'PriorityQueue for min-heap behavior',
    ],
    body: 'Queue and Deque are essential for BFS algorithms, task scheduling, and undo/redo functionality.',
    codeExample: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.PriorityQueue;

public class QueueDemo {
    public static void main(String[] args) {
        // ArrayDeque as a Queue (FIFO)
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("Task-1");
        queue.offer("Task-2");
        queue.offer("Task-3");

        System.out.println(queue.poll()); // Task-1

        // ArrayDeque as a Stack (LIFO)
        Deque<String> stack = new ArrayDeque<>();
        stack.push("Page-1");
        stack.push("Page-2");
        System.out.println(stack.pop()); // Page-2

        // PriorityQueue — min-heap
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(5); pq.offer(1); pq.offer(3);
        System.out.println(pq.poll()); // 1 (smallest first)
    }
}`,
    trainerNotes: 'Use a real-world analogy — task queue in a CI pipeline. Ask students what data structure powers a browser\'s back button (Stack via Deque).',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-11',
    number: 11,
    title: 'Streams API with Collections',
    type: 'code',
    content: [
      'Streams enable functional-style operations',
      'filter(), map(), reduce(), collect()',
      'Lazy evaluation — only processes what\'s needed',
      'Terminal operations trigger execution',
    ],
    body: 'Java Streams pair naturally with Collections, enabling concise, readable data processing pipelines.',
    codeExample: `import java.util.*;
import java.util.stream.*;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = List.of(
            "Alice", "Bob", "Charlie", "Anna", "Brian"
        );

        // Filter → Map → Collect
        List<String> result = names.stream()
            .filter(n -> n.startsWith("A"))  // Alice, Anna
            .map(String::toUpperCase)         // ALICE, ANNA
            .sorted()
            .collect(Collectors.toList());

        System.out.println(result); // [ALICE, ANNA]

        // Group by first letter
        Map<Character, List<String>> grouped = names.stream()
            .collect(Collectors.groupingBy(n -> n.charAt(0)));
        System.out.println(grouped);
    }
}`,
    trainerNotes: 'Streams can confuse beginners — keep it practical. Show a before/after: same logic with explicit loops vs streams. End with: "Streams don\'t replace loops, they complement them."',
    hasCode: true,
    verificationStatus: 'passed',
    theme: 'dark',
    diagram: null,
  },
  {
    id: 'slide-12',
    number: 12,
    title: 'Summary and Next Steps',
    type: 'summary',
    content: [
      'Collections Framework provides a rich toolbox',
      'ArrayList for indexed access, LinkedList for deques',
      'HashMap / HashSet for O(1) key/element lookup',
      'Use Streams for expressive data pipelines',
    ],
    body: 'You now have a solid foundation in Java Collections. Practice with the exercises, and challenge yourself with the Streams API homework.',
    codeExample: null,
    trainerNotes: 'End with a quick Q&A. Give students 2 minutes to write down one thing they learned and one question they still have. Use those questions to guide the exercise session.',
    hasCode: false,
    verificationStatus: null,
    theme: 'dark',
    diagram: null,
  },
];
