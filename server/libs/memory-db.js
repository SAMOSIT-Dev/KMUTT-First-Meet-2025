module.exports = class MemoryDb {
  #collections = new Map();
  #cloneOnRead = false;

  constructor(options = {}) {
    this.#cloneOnRead = options.cloneOnRead || false;
  }

  set(name, value) {
    this.#collections.set(name, { value });
  }

  get(name) {
    const entry = this.#collections.get(name);
    if (!entry) return undefined;

    return this.#cloneOnRead ? structuredClone(entry.value) : entry.value;
  }

  has(name) {
    return this.#collections.has(name);
  }

  remove(name) {
    this.#collections.delete(name);
  }

  update(name, value) {
    if (!this.has(name)) return;

    const old = this.get(name);
    const updated = { ...old, ...value };
    this.set(name, updated);
  }

  keys() {
    return Array.from(this.#collections.keys());
  }

  entries() {
    const result = [];
    for (const [key, entry] of this.#collections.entries()) {
      result.push([key, entry.value]);
    }
    return result;
  }

  reset() {
    this.#collections.clear();
  }
};
