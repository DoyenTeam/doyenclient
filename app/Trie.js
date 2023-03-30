class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

export default class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let currentNode = this.root;
        for (const char of word) {
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.isEndOfWord = true;
    }

    findWordsWithPrefix(prefix) {
        let currentNode = this.root;
        const result = [];

        for (const char of prefix) {
            if (!currentNode.children[char]) {
                return result;
            }
            currentNode = currentNode.children[char];
        }

        this.dfs(currentNode, prefix, result);
        return result;
    }

    dfs(node, prefix, result) {
        if (node.isEndOfWord) {
            result.push(prefix);
        }

        for (const char in node.children) {
            this.dfs(node.children[char], prefix + char, result);
        }
    }
}

