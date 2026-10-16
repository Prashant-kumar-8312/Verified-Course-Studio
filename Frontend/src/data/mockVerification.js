// src/data/mockVerification.js
export const mockVerificationSummary = {
  total: 8,
  passed: 6,
  failed: 1,
  pending: 1,
  environment: 'Java 21 (OpenJDK 21.0.2)',
  verifiedAt: null,
  isDemoData: true,
};

export const mockSnippets = [
  {
    id: 'snip-001',
    title: 'ArrayList Basic Operations',
    slideId: 'slide-3',
    slideTitle: 'ArrayList — Dynamic Arrays',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 312,
    code: `import java.util.ArrayList;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        System.out.println(fruits.get(1)); // Banana
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        fruits.remove("Banana");
        System.out.println("Size after remove: " + fruits.size()); // 2
    }
}`,
    compilationOutput: '> Task :compileJava UP-TO-DATE\n> Task :processResources NO-SOURCE\n> Task :classes UP-TO-DATE\nBUILD SUCCESSFUL in 0s',
    executionOutput: 'Banana\nApple\nBanana\nCherry\nSize after remove: 2',
    expectedOutput: 'Banana\nApple\nBanana\nCherry\nSize after remove: 2',
    testsPassed: 3,
    testsFailed: 0,
    command: 'javac ArrayListDemo.java && java ArrayListDemo',
    verificationHistory: [
      { at: '2026-10-12T10:15:00Z', status: 'passed', durationMs: 312 },
    ],
  },
  {
    id: 'snip-002',
    title: 'LinkedList as Deque',
    slideId: 'slide-4',
    slideTitle: 'LinkedList — Doubly Linked',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 298,
    code: `import java.util.LinkedList;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<Integer> numbers = new LinkedList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.addFirst(5);
        numbers.addLast(40);
        System.out.println("First: " + numbers.peekFirst()); // 5
        System.out.println("Last:  " + numbers.peekLast());  // 40
        int head = numbers.pollFirst();
        System.out.println("Popped: " + head);
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'First: 5\nLast:  40\nPopped: 5',
    expectedOutput: 'First: 5\nLast:  40\nPopped: 5',
    testsPassed: 2,
    testsFailed: 0,
    command: 'javac LinkedListDemo.java && java LinkedListDemo',
    verificationHistory: [
      { at: '2026-10-12T10:16:00Z', status: 'passed', durationMs: 298 },
    ],
  },
  {
    id: 'snip-003',
    title: 'HashMap Operations',
    slideId: 'slide-5',
    slideTitle: 'HashMap — Key-Value Storage',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 341,
    code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob",   78);
        scores.put("Carol", 88);
        System.out.println("Alice: " + scores.get("Alice"));
        if (scores.containsKey("Bob")) {
            scores.put("Bob", scores.get("Bob") + 5);
        }
        for (Map.Entry<String, Integer> e : scores.entrySet()) {
            System.out.printf("%s → %d%n", e.getKey(), e.getValue());
        }
        int dana = scores.getOrDefault("Dana", 0);
        System.out.println("Dana: " + dana);
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'Alice: 95\nAlice → 95\nBob → 83\nCarol → 88\nDana: 0',
    expectedOutput: 'Alice: 95\n[entries in any order]\nDana: 0',
    testsPassed: 4,
    testsFailed: 0,
    command: 'javac HashMapDemo.java && java HashMapDemo',
    verificationHistory: [
      { at: '2026-10-12T10:17:00Z', status: 'passed', durationMs: 341 },
    ],
  },
  {
    id: 'snip-004',
    title: 'HashSet Uniqueness',
    slideId: 'slide-6',
    slideTitle: 'HashSet — Unique Elements',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'failed',
    executionDurationMs: 287,
    code: `import java.util.HashSet;
import java.util.Set;

public class HashSetDemo {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();
        tags.add("java");
        tags.add("collections");
        tags.add("java"); // duplicate
        System.out.println("Size: " + tags.size()); // 2
        Set<String> extra = new HashSet<>();
        extra.add("streams");
        extra.add("java");
        Set<String> common = new HashSet<>(tags);
        common.retainAll(extra);
        System.out.println("Common: " + common);
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'Size: 2\nCommon: [java]',
    expectedOutput: 'Size: 2\nCommon: [java]',
    error: 'Test case 3 FAILED: Expected intersection with empty set to return empty set, got [java]. Possible issue in retainAll defensive copy logic.',
    testsPassed: 2,
    testsFailed: 1,
    command: 'javac HashSetDemo.java && java HashSetDemo',
    verificationHistory: [
      { at: '2026-10-11T16:40:00Z', status: 'failed', durationMs: 290 },
      { at: '2026-10-12T10:18:00Z', status: 'failed', durationMs: 287 },
    ],
  },
  {
    id: 'snip-005',
    title: 'Iterator Safe Removal',
    slideId: 'slide-8',
    slideTitle: 'Iterators and the for-each Loop',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 256,
    code: `import java.util.*;

public class IteratorDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>(List.of("Alpha", "Beta", "Gamma"));
        Iterator<String> it = items.iterator();
        while (it.hasNext()) {
            if (it.next().equals("Beta")) it.remove();
        }
        for (String item : items) {
            System.out.println(item);
        }
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'Alpha\nGamma',
    expectedOutput: 'Alpha\nGamma',
    testsPassed: 2,
    testsFailed: 0,
    command: 'javac IteratorDemo.java && java IteratorDemo',
    verificationHistory: [
      { at: '2026-10-12T10:19:00Z', status: 'passed', durationMs: 256 },
    ],
  },
  {
    id: 'snip-006',
    title: 'Collections Utility Methods',
    slideId: 'slide-9',
    slideTitle: 'Collections Utility Class',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 301,
    code: `import java.util.*;

public class CollectionsUtilDemo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(42, 7, 19, 3, 88, 15));
        Collections.sort(nums);
        System.out.println("Sorted: " + nums);
        System.out.printf("Min=%d, Max=%d%n", Collections.min(nums), Collections.max(nums));
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'Sorted: [3, 7, 15, 19, 42, 88]\nMin=3, Max=88',
    expectedOutput: 'Sorted: [3, 7, 15, 19, 42, 88]\nMin=3, Max=88',
    testsPassed: 3,
    testsFailed: 0,
    command: 'javac CollectionsUtilDemo.java && java CollectionsUtilDemo',
    verificationHistory: [
      { at: '2026-10-12T10:20:00Z', status: 'passed', durationMs: 301 },
    ],
  },
  {
    id: 'snip-007',
    title: 'Queue and PriorityQueue',
    slideId: 'slide-10',
    slideTitle: 'Queue and Deque',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'passed',
    executionDurationMs: 278,
    code: `import java.util.*;

public class QueueDemo {
    public static void main(String[] args) {
        Deque<String> queue = new ArrayDeque<>();
        queue.offer("Task-1"); queue.offer("Task-2"); queue.offer("Task-3");
        System.out.println(queue.poll()); // Task-1
        Deque<String> stack = new ArrayDeque<>();
        stack.push("Page-1"); stack.push("Page-2");
        System.out.println(stack.pop()); // Page-2
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(5); pq.offer(1); pq.offer(3);
        System.out.println(pq.poll()); // 1
    }
}`,
    compilationOutput: 'BUILD SUCCESSFUL in 0s',
    executionOutput: 'Task-1\nPage-2\n1',
    expectedOutput: 'Task-1\nPage-2\n1',
    testsPassed: 3,
    testsFailed: 0,
    command: 'javac QueueDemo.java && java QueueDemo',
    verificationHistory: [
      { at: '2026-10-12T10:21:00Z', status: 'passed', durationMs: 278 },
    ],
  },
  {
    id: 'snip-008',
    title: 'Streams with Collections',
    slideId: 'slide-11',
    slideTitle: 'Streams API with Collections',
    language: 'Java',
    runtimeVersion: 'Java 21',
    status: 'pending',
    executionDurationMs: null,
    code: `import java.util.*;
import java.util.stream.*;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = List.of("Alice","Bob","Charlie","Anna","Brian");
        List<String> result = names.stream()
            .filter(n -> n.startsWith("A"))
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
        System.out.println(result);
    }
}`,
    compilationOutput: null,
    executionOutput: null,
    expectedOutput: '[ALICE, ANNA]',
    testsPassed: 0,
    testsFailed: 0,
    command: 'javac StreamsDemo.java && java StreamsDemo',
    verificationHistory: [],
  },
];
