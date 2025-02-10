# ElasticHashing
This is a proof of concept for implementing `Elastic Hashing` to create a new type of hash table without reordering elements while achieving optimal probe complexity. This implementation was formulated from: `Optimal Bounds for Open Addressing Without Reordering - Martin Farach-Colton, Andrew Krapivin, William Kuszmaul`

Key Steps in Creating the Elastic Hash Table:

- **Array Partitioning**: The array is broken into disjoint arrays \(A_1, A_2, \dots, A_{\lceil \log n \rceil}\), where each subsequent array \(A_{i+1}\) is approximately half the size of \(A_i\).

- **Two-Dimensional Probe Sequence Simulation**: A two-dimensional probe sequence \(\{h_{i,j}\}\) is simulated, where \(h_{i,j}(x)\) represents a random slot in array \(A_i\).
  - This probe sequence is mapped to a one-dimensional sequence using a specific injection function \(\phi(i,j)\), which helps in minimizing probe complexity.

- **Batch Insertion Strategy**:
  - **Batch \(B_0\)**: Fills \(A_1\) to 75% full.
  - **Subsequent Batches \(B_i\)**: Insertions are placed in both \(A_i\) and \(A_{i+1}\), ensuring that \(A_i\) maintains a fraction of free slots while \(A_{i+1}\) gets filled up.

- **Insertion Logic**:
  - If \(A_i\) is sufficiently empty, the element is placed there.
  - Otherwise, the element is placed in \(A_{i+1}\).
  - A non-greedy approach ensures that elements probe further into their sequence before settling on a position, which helps avoid probe complexity bottlenecks like the "coupon-collector problem."

- **Probe Complexity Guarantees**:
  - **Amortized Expected Probe Complexity**: \(O(1)\)
  - **Worst-case Expected Probe Complexity**: \(O(\log \delta^{-1})\), where \(\delta\) represents the load factor.

Source:
https://arxiv.org/abs/2501.02305

Bibtex:
@misc{farachcolton2025optimalboundsopenaddressing,
      title={Optimal Bounds for Open Addressing Without Reordering}, 
      author={Martin Farach-Colton and Andrew Krapivin and William Kuszmaul},
      year={2025},
      eprint={2501.02305},
      archivePrefix={arXiv},
      primaryClass={cs.DS},
      url={https://arxiv.org/abs/2501.02305}, 
}
