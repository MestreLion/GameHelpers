#!/usr/bin/env python

import string

D = {k: v for k, v in  zip(string.lowercase, string.lowercase[::-1])}

def rev(s):
    return ''.join(D[_] for _ in s)

print rev('ellwll')
print rev('hrnkov')
print rev('proo')
print rev('zoo')
print rev('mznvh')
