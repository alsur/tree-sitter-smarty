[
 (if)
 (foreach)
 (block)
 (nocache)
] @indent.begin

[
 (else_if)
 (else)
 (foreach_else)
] @indent.branch

; Los nodos de cierre ahora están incluidos en los nodos padres
; No necesitamos hacer match explícito de los delimitadores de cierre
(ERROR) @indent.auto
