class ElasticHashTable {
  private n: number;
  private delta: number;
  private arrays: number[];
  private table: (string | null)[];
  private insertedKeys: Set<string>;

  constructor(n: number, delta: number) {
    /**
     * Initialize an elastic hash table.
     * @param n Total number of slots in the table.
     * @param delta Load factor parameter (fraction of free slots required).
     */
    this.n = n;
    this.delta = delta;
    this.arrays = this.initializeArrays();
    this.table = Array(n).fill(null);
    this.insertedKeys = new Set<string>();
  }

  private initializeArrays(): number[] {
    /**
     * Partition the table into exponentially decreasing arrays.
     */
    const arrays: number[] = [];
    let remainingSize = this.n;
    let i = 0;
    while (remainingSize > 0 && i < Math.ceil(Math.log2(this.n))) {
      const size = Math.max(1, Math.floor(remainingSize / 2));
      arrays.push(size);
      remainingSize -= size;
      i++;
    }
    return arrays;
  }

  private probeSequence(key: string, i: number): number[] {
    /**
     * Generate a probe sequence for a key in the i-th array.
     */
    const seed = this.hashCode(key) + i;
    const sequence: number[] = [];
    for (let j = 0; j < 10; j++) {
      sequence.push((seed + j) % this.n); // Generate pseudo-random probes
    }
    return sequence;
  }

  private hashCode(key: string): number {
    /**
     * Generate a simple hash code for a string.
     */
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  public insert(key: string): boolean {
    /**
     * Insert a key into the hash table using elastic hashing.
     */
    if (this.insertedKeys.has(key)) {
      return false; // Key already inserted
    }

    for (let i = 0; i < this.arrays.length; i++) {
      const probeSequence = this.probeSequence(key, i);
      for (const probe of probeSequence) {
        if (this.table[probe] === null) {
          this.table[probe] = key;
          this.insertedKeys.add(key);
          return true; // Successfully inserted
        }
      }
    }
    return false; // Table is full
  }

  public search(key: string): number {
    /**
     * Search for a key in the hash table.
     */
    for (let i = 0; i < this.arrays.length; i++) {
      const probeSequence = this.probeSequence(key, i);
      for (const probe of probeSequence) {
        if (this.table[probe] === key) {
          return probe; // Key found at this index
        }
      }
    }
    return -1; // Key not found
  }

  public toString(): string {
    /**
     * Display the hash table contents.
     */
    return this.table.map((k) => (k !== null ? k : '-')).join(', ');
  }
}

// Example Usage
const n = 64; // Table size
const elasticHash = new ElasticHashTable(n, 0.1);
const keys = ["key1", "key2", "key3", "key4", "key5"];

// Insert keys
for (const key of keys) {
  elasticHash.insert(key);
}

// Search for a key
console.log("Search key2:", elasticHash.search("key2"));

// Print table
console.log(elasticHash.toString());
