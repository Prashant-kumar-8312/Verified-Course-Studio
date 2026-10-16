// src/data/mockExercises.js
export const mockExercises = [
  {
    id: 'ex-001',
    title: 'Student Grade Manager',
    difficulty: 'Easy',
    topic: 'HashMap',
    slideId: 'slide-5',
    description:
      'Implement a StudentGradeManager class that uses a HashMap to store student names and their grades. The class should support adding students, updating grades, retrieving a student\'s grade, and computing the class average.',
    learningObjectives: [
      'Practice HashMap put, get, and entrySet operations',
      'Implement defensive null checks',
      'Calculate aggregate statistics from a Map',
    ],
    problemStatement: `Create a class \`StudentGradeManager\` with the following methods:
- \`void addStudent(String name, int grade)\` — adds or updates a student
- \`int getGrade(String name)\` — returns the grade, or -1 if not found
- \`double getAverage()\` — returns the average grade of all students
- \`List<String> getTopStudents(int n)\` — returns top N students by grade`,
    exampleInput: `manager.addStudent("Alice", 92);
manager.addStudent("Bob", 78);
manager.addStudent("Carol", 88);
manager.getGrade("Alice")
manager.getAverage()
manager.getTopStudents(2)`,
    exampleOutput: `92
86.0
["Alice", "Carol"]`,
    testCases: [
      { id: 'tc-1', description: 'Single student grade retrieval', input: 'addStudent("Alice", 92)', expected: 'getGrade("Alice") == 92', status: 'passed' },
      { id: 'tc-2', description: 'Average of three students',     input: 'addStudent x3',          expected: 'getAverage() == 86.0',       status: 'passed' },
      { id: 'tc-3', description: 'Unknown student returns -1',    input: 'getGrade("Zara")',        expected: '-1',                        status: 'passed' },
      { id: 'tc-4', description: 'Top 2 students correct order',  input: 'getTopStudents(2)',       expected: '["Alice","Carol"]',          status: 'passed' },
      { id: 'tc-5', description: 'Update existing student grade', input: 'addStudent("Bob", 95)',   expected: 'getGrade("Bob") == 95',      status: 'passed' },
    ],
    referenceSolution: `import java.util.*;
import java.util.stream.*;

public class StudentGradeManager {
    private final Map<String, Integer> grades = new HashMap<>();

    public void addStudent(String name, int grade) {
        grades.put(name, grade);
    }

    public int getGrade(String name) {
        return grades.getOrDefault(name, -1);
    }

    public double getAverage() {
        if (grades.isEmpty()) return 0.0;
        return grades.values().stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
    }

    public List<String> getTopStudents(int n) {
        return grades.entrySet().stream()
            .sorted(Map.Entry.<String,Integer>comparingByValue().reversed())
            .limit(n)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
}`,
    naiveSolution: `import java.util.*;

public class StudentGradeManager {
    private Map<String, Integer> grades = new HashMap<>();

    public void addStudent(String name, int grade) {
        grades.put(name, grade);
    }

    public int getGrade(String name) {
        if (grades.containsKey(name)) {
            return grades.get(name);
        }
        return -1;
    }

    public double getAverage() {
        int sum = 0;
        for (int g : grades.values()) {
            sum += g;
        }
        return grades.isEmpty() ? 0.0 : (double) sum / grades.size();
    }

    public List<String> getTopStudents(int n) {
        List<Map.Entry<String,Integer>> entries = new ArrayList<>(grades.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        List<String> result = new ArrayList<>();
        for (int i = 0; i < Math.min(n, entries.size()); i++) {
            result.add(entries.get(i).getKey());
        }
        return result;
    }
}`,
    referenceStatus: 'passed',
    naiveStatus: 'passed',
    testsPassed: 5,
    testsFailed: 0,
  },
  {
    id: 'ex-002',
    title: 'Duplicate Finder',
    difficulty: 'Easy',
    topic: 'HashSet',
    slideId: 'slide-6',
    description:
      'Write a method that finds all duplicate elements in an integer array using a HashSet. Return them as a sorted List without repeated duplicates.',
    learningObjectives: [
      'Use HashSet for O(1) membership testing',
      'Understand set semantics for uniqueness',
      'Combine Set with sorting via TreeSet',
    ],
    problemStatement: `Implement:
\`List<Integer> findDuplicates(int[] arr)\`
Returns a sorted list of integers that appear more than once in \`arr\`.`,
    exampleInput: `int[] arr = {1, 3, 4, 2, 2, 3, 1, 5};
findDuplicates(arr)`,
    exampleOutput: `[1, 2, 3]`,
    testCases: [
      { id: 'tc-1', description: 'Basic duplicates',       input: '[1,3,4,2,2,3,1,5]', expected: '[1,2,3]',  status: 'passed' },
      { id: 'tc-2', description: 'No duplicates',          input: '[1,2,3,4,5]',        expected: '[]',        status: 'passed' },
      { id: 'tc-3', description: 'All same',               input: '[7,7,7,7]',           expected: '[7]',       status: 'passed' },
      { id: 'tc-4', description: 'Single element',         input: '[42]',                expected: '[]',        status: 'passed' },
      { id: 'tc-5', description: 'Negative numbers',       input: '[-1,-2,-1,3,3]',      expected: '[-1,3]',    status: 'failed' },
    ],
    referenceSolution: `import java.util.*;

public class DuplicateFinder {
    public static List<Integer> findDuplicates(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> dups = new TreeSet<>(); // auto-sorted
        for (int n : arr) {
            if (!seen.add(n)) dups.add(n);
        }
        return new ArrayList<>(dups);
    }
}`,
    naiveSolution: `import java.util.*;

public class DuplicateFinder {
    public static List<Integer> findDuplicates(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        List<Integer> dups = new ArrayList<>();
        for (int n : arr) {
            if (seen.contains(n) && !dups.contains(n)) {
                dups.add(n);
            } else {
                seen.add(n);
            }
        }
        Collections.sort(dups);
        return dups;
    }
}`,
    referenceStatus: 'passed',
    naiveStatus: 'failed',
    testsPassed: 4,
    testsFailed: 1,
  },
  {
    id: 'ex-003',
    title: 'Word Frequency Counter',
    difficulty: 'Medium',
    topic: 'HashMap + Streams',
    slideId: 'slide-11',
    description:
      'Build a word frequency counter that parses a text string, counts occurrences of each word (case-insensitive), and returns the top N most frequent words.',
    learningObjectives: [
      'Combine HashMap with stream operations',
      'Use getOrDefault for frequency counting',
      'Sort Map entries by value using Streams',
    ],
    problemStatement: `Implement:
\`List<String> topNWords(String text, int n)\`
- Splits text by non-word characters
- Counts word occurrences case-insensitively
- Returns top N words by frequency (descending)`,
    exampleInput: `String text = "the cat sat on the mat the cat";
topNWords(text, 2)`,
    exampleOutput: `["the", "cat"]`,
    testCases: [
      { id: 'tc-1', description: 'Basic top 2 words',      input: '"the cat sat on the mat the cat", 2', expected: '["the","cat"]', status: 'passed' },
      { id: 'tc-2', description: 'Case insensitive',       input: '"Java JAVA java", 1',                 expected: '["java"]',       status: 'passed' },
      { id: 'tc-3', description: 'N larger than vocab',    input: '"hello world", 10',                   expected: '["hello","world"]', status: 'passed' },
      { id: 'tc-4', description: 'Empty string',           input: '"", 3',                               expected: '[]',             status: 'passed' },
    ],
    referenceSolution: `import java.util.*;
import java.util.stream.*;

public class WordFrequency {
    public static List<String> topNWords(String text, int n) {
        if (text == null || text.isBlank()) return List.of();
        Map<String, Long> freq = Arrays.stream(text.split("\\\\W+"))
            .filter(w -> !w.isBlank())
            .map(String::toLowerCase)
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
        return freq.entrySet().stream()
            .sorted(Map.Entry.<String,Long>comparingByValue().reversed())
            .limit(n)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
}`,
    naiveSolution: `import java.util.*;

public class WordFrequency {
    public static List<String> topNWords(String text, int n) {
        if (text == null || text.isEmpty()) return new ArrayList<>();
        String[] words = text.toLowerCase().split("\\\\W+");
        Map<String, Integer> freq = new HashMap<>();
        for (String w : words) {
            if (!w.isEmpty()) {
                freq.put(w, freq.getOrDefault(w, 0) + 1);
            }
        }
        List<Map.Entry<String,Integer>> entries = new ArrayList<>(freq.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        List<String> result = new ArrayList<>();
        for (int i = 0; i < Math.min(n, entries.size()); i++) {
            result.add(entries.get(i).getKey());
        }
        return result;
    }
}`,
    referenceStatus: 'passed',
    naiveStatus: 'passed',
    testsPassed: 4,
    testsFailed: 0,
  },
  {
    id: 'ex-004',
    title: 'Task Queue Simulator',
    difficulty: 'Medium',
    topic: 'Queue / Deque',
    slideId: 'slide-10',
    description:
      'Implement a simple priority task queue using PriorityQueue. Tasks have a priority level (1-5, lower is higher priority). The queue should process tasks in priority order.',
    learningObjectives: [
      'Use PriorityQueue with a custom Comparator',
      'Model domain objects as queue elements',
      'Implement FIFO within the same priority',
    ],
    problemStatement: `Implement class \`TaskQueue\`:
- \`void enqueue(String name, int priority)\`
- \`String dequeue()\` — returns next highest-priority task name
- \`boolean isEmpty()\`
- \`int size()\``,
    exampleInput: `queue.enqueue("Fix Bug", 1);
queue.enqueue("Write Tests", 3);
queue.enqueue("Deploy", 2);
queue.dequeue()`,
    exampleOutput: `"Fix Bug"`,
    testCases: [
      { id: 'tc-1', description: 'Dequeue highest priority first', input: 'enqueue x3, dequeue',    expected: '"Fix Bug"',    status: 'passed' },
      { id: 'tc-2', description: 'Queue size tracking',            input: 'enqueue x2, size',        expected: '2',           status: 'passed' },
      { id: 'tc-3', description: 'isEmpty on empty queue',         input: 'dequeue all, isEmpty',    expected: 'true',        status: 'passed' },
      { id: 'tc-4', description: 'Same priority preserves FIFO',   input: 'enqueue p2 x3, dequeue',  expected: 'first p2 task', status: 'passed' },
    ],
    referenceSolution: `import java.util.*;

public class TaskQueue {
    private record Task(String name, int priority, long order) {}
    private long counter = 0;
    private final PriorityQueue<Task> pq = new PriorityQueue<>(
        Comparator.comparingInt(Task::priority)
                  .thenComparingLong(Task::order)
    );

    public void enqueue(String name, int priority) {
        pq.offer(new Task(name, priority, counter++));
    }

    public String dequeue() {
        Task t = pq.poll();
        return t == null ? null : t.name();
    }

    public boolean isEmpty() { return pq.isEmpty(); }
    public int size()        { return pq.size(); }
}`,
    naiveSolution: `import java.util.*;

public class TaskQueue {
    private List<String[]> tasks = new ArrayList<>();

    public void enqueue(String name, int priority) {
        tasks.add(new String[]{name, String.valueOf(priority)});
    }

    public String dequeue() {
        if (tasks.isEmpty()) return null;
        int best = 0;
        for (int i = 1; i < tasks.size(); i++) {
            if (Integer.parseInt(tasks.get(i)[1]) < Integer.parseInt(tasks.get(best)[1])) {
                best = i;
            }
        }
        return tasks.remove(best)[0];
    }

    public boolean isEmpty() { return tasks.isEmpty(); }
    public int size()        { return tasks.size(); }
}`,
    referenceStatus: 'passed',
    naiveStatus: 'passed',
    testsPassed: 4,
    testsFailed: 0,
  },
];
