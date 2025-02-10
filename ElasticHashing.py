import random
import math

class ElasticHashTable:
    def __init__(self, n, delta):
        """
        Elastic Hash Table.
        :param n: total number of slots in table.
        :param delta: load factor parameter (fraction of free slots required).
        """
        self.n = n # table size
        self.delta = delta # free slots
        self.arrays = self._initialize_arrays() 
        self.table = [None] * n  # main hash table storage
        self.inserted_keys = set()

    def _initialize_arrays(self):
        """
        Partition table into exponentially decreasing arrays.
        """
        arrays = []
        remaining_size = self.n
        i = 0
        while remaining_size > 0 and i < math.ceil(math.log2(self.n)):
            size = max(1, remaining_size // 2)  # check for at least 1 slot in the array
            arrays.append(size)
            remaining_size -= size
            i += 1
        return arrays

    def _probe_sequence(self, key, i):
        """
        Generate probe sequence for a key in the i-th array.
        """
        random.seed(hash(key) + i)  # randomness per array
        return [random.randint(0, self.n - 1) for _ in range(10)]  # Probe limit

    def insert(self, key):
        """
        Inserts a key into the hash table using elastic hashing.
        """
        if key in self.inserted_keys:
            return False  # key already inserted
        
        for i, array_size in enumerate(self.arrays):
            probe_sequence = self._probe_sequence(key, i)
            for probe in probe_sequence:
                if self.table[probe] is None:
                    self.table[probe] = key
                    self.inserted_keys.add(key)
                    return True  # success
        return False  # table full

    def search(self, key):
        """
        Search for a key in the hash table.
        """
        for i, array_size in enumerate(self.arrays):
            probe_sequence = self._probe_sequence(key, i)
            for probe in probe_sequence:
                if self.table[probe] == key:
                    return probe  # key found at index: ...
        return -1  # key not found

    def __repr__(self):
        """
        Display the hash table contents.
        """
        return str([k if k is not None else '-' for k in self.table])



n = 64  # table size
elastic_hash = ElasticHashTable(n, delta=0.1)
keys = ["key1", "key2", "key3", "key4", "key5"]

# insert keys
for key in keys:
    elastic_hash.insert(key)

# search for key
print("Search key2:", elastic_hash.search("key2"))

# print table
print(elastic_hash)
