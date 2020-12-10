# State of the art

- https://asciidoctor.org/docs/asciidoctor-diagram/
- https://github.com/christiangoltz/shaape
- https://github.com/dhobsd/asciitosvg
- http://ditaa.sourceforge.net/
- https://casual-effects.com/markdeep/
- https://mermaid-js.github.io/mermaid/#/
- https://www.nomnoml.com/
- https://github.com/adobe-type-tools/box-drawing / http://adobe-type-tools.github.io/box-drawing/
- https://github.com/MarkLodato/js-boxdrawing / http://marklodato.github.io/js-boxdrawing/
- https://elpa.gnu.org/packages/ascii-art-to-unicode.html
- https://github.com/fmthoma/ascii-art-to-unicode /
- https://hackage.haskell.org/package/ascii-art-to-unicode / https://hackage.haskell.org/package/ascii-art-to-unicode-0.1.0.1/docs/Text-AsciiArt.html
- https://github.com/ivanceras/svgbob / https://svgbob-editor.netlify.app/

# Unicode

- https://en.wikipedia.org/wiki/Box_Drawing_(Unicode_block)
- https://en.wikipedia.org/wiki/Block_Elements
- https://en.wikipedia.org/wiki/Geometric_Shapes
- https://en.wikipedia.org/wiki/Box-drawing_character
- https://en.wikipedia.org/wiki/Semigraphics

```
      ╦╩
      ╩

     ╭─╮  ┏━┓
     │ │  ┃ ┃
     ╰─╯  ┗━┛

      ╳
     ╱ ╲
    ╱   ╲


 	    0	1	2	3	4	5	6	7	8	9	A	B	C	D	E	F
U+250x	─	━	│	┃	┄	┅	┆	┇	┈	┉	┊	┋	┌	┍	┎	┏
U+251x	┐	┑	┒	┓	└	┕	┖	┗	┘	┙	┚	┛	├	┝	┞	┟
U+252x	┠	┡	┢	┣	┤	┥	┦	┧	┨	┩	┪	┫	┬	┭	┮	┯
U+253x	┰	┱	┲	┳	┴	┵	┶	┷	┸	┹	┺	┻	┼	┽	┾	┿
U+254x	╀	╁	╂	╃	╄	╅	╆	╇	╈	╉	╊	╋	╌	╍	╎	╏
U+255x	═	║	╒	╓	╔	╕	╖	╗	╘	╙	╚	╛	╜	╝	╞	╟
U+256x	╠	╡	╢	╣	╤	╥	╦	╧	╨	╩	╪	╫	╬	╭	╮	╯
U+257x	╰	╱	╲	╳	╴	╵	╶	╷	╸	╹	╺	╻	╼	╽	╾	╿

	    0	1	2	3	4	5	6	7	8	9	A	B	C	D	E	F
U+258x	▀	▁	▂	▃	▄	▅	▆	▇	█	▉	▊	▋	▌	▍	▎	▏
U+259x	▐	░	▒	▓	▔	▕	▖	▗	▘	▙	▚	▛	▜	▝	▞	▟

 	    0	1	2	3	4	5	6	7	8	9	A	B	C	D	E	F
U+25Ax	■	□	▢	▣	▤	▥	▦	▧	▨	▩	▪	▫	▬	▭	▮	▯
U+25Bx	▰	▱	▲	△	▴	▵	▶	▷	▸	▹	►	▻	▼	▽	▾	▿
U+25Cx	◀	◁	◂	◃	◄	◅	◆	◇	◈	◉	◊	○	◌	◍	◎	●
U+25Dx	◐	◑	◒	◓	◔	◕	◖	◗	◘	◙	◚	◛	◜	◝	◞	◟
U+25Ex	◠	◡	◢	◣	◤	◥	◦	◧	◨	◩	◪	◫	◬	◭	◮	◯
U+25Fx	◰	◱	◲	◳	◴	◵	◶	◷	◸	◹	◺	◻	◼	◽	◾	◿
```

https://www.compart.com/en/unicode/block/U+2B00

# Design principles (alternative #1)

Divide each character box into 4 quadrants.

```

    +--+--+
    |  |  |
    +--+--+
    |  |  |
    +--+--+

```

Each quadrant vertex can be connected to all its neighbors:

```

    +----+
    |\  /|
    | \/ |
    | /\ |
    |/  \|
    +----+

```

This gives 6 potential links. For a character's 4 quadrants this gives 20
potential links (24 minus 4 common central links). This is similar to segment
displays.

```

    +--+--+
    |\/|\/|
    |/\|/\|
    +--+--+
    |\/|\/|
    |/\|/\|
    +--+--+

```

Central point is an attachment point.

# Design principles (alternative #2)

1. Normalize ASCII to unambiguous Unicode
2. Transform Unicode to SVG

# Design principles (alternative #3)

2D pattern matching

Each pattern is a `m` x `m` square with:

- One hotspot character at the center
- `m` regexps, one per line, anchored at both lengths, of length `m`
- A `m` x `m` 2D binary erasure mask
- SVG replacement code

Source: `w` x `h` array of characters to replace

Target:

- Accumulated SVG code
- `w` x `h` accumulated binary erasure mask
- `w` x `h` array of unerased source characters

1. Iterate over all hotspots in the text
   - Try to match all regexps around the hotspot (adding spaces for missing characters)
   - If matched:
     - Accumulate SVG code
     - Accumulate binary erasure mask with binary-OR mode
2. Copy unerased source characters to target

Possible improvement: use a SVG font instead of explicit code

# Examples

## Arrows

simple arrows:

```

       ^           ^
       |           |
    <-   ->     <-   ->
       |           |
       v           V

```

empty arrows:

```

        ^               ^
        -               -
        |               |
    <|-   -|>       <:-   -:>
        |               |
        -               -
        v               V

```

diamonds:

```

        ^
        *
        v
        |
    <*>-  -<*>
        |
        ^
        *
        v

```

empty diamonds:

```

        ^
        v
        |
    <>-  -<>
        |
        ^
        v

```

dots:

```

       *
       |
    *-   -*
       |
       *

```

empty dots:

```

       o
       |
    o-   -o
       |
       o

```

## Intersection

Omni:

```

     |
    -+-
     |

```

Top:

```

     |
    -'-

```

Bottom:

```

    -.-
     |

```

Jumps:

```

     |       |
    -)-     -(-
     |       |

```

## Lines

Simple:

```

    |   ----
    |

```

Double:

```

    #   ####  ||  =====
    #         ||

```

Dotted:

```

    :   ....
    :

```

## Corners

Square:

```

    +-  -+
    |    |

    |    |
    +-  -+

    .-  -.
    |    |

    |    |
    '-  -'

    ..  ..
    :    :

    :    :
    ..  ..

    ...  ...
    :      :

    :      :
    :..  ..:

    ##  ##
    #    #

    #    #
    ##  ##

    #= =#
    #   #

    #   #
    #= =#
```

Rounded:

```

    /-  -\
    |    |

    |    |
    \-  -/

     /- -\
    |     |

    |     |
     \- -/

      -  -
     /    \
     |    |

     |    |
     \    /
      -  -

     .- -.
    |     |

    |     |
     '- -'

     .. ..
    :     :

    :     :
     .. ..

     ... ...
    :       :

    :       :
     '.. ..'

    .#  #.
    #    #

    #    #
    '#  #'

```

## Boxes

Simple:

```

    +-------------------+
    | simple border box |
    +-------------------+

    .-------------------.
    | simple border box |
    '-------------------'

     .-------------.
    | simple border |
    | rounded box   |
     '-------------'

    /---------------\
    | simple border |
    | rounded box   |
    \---------------/

```

Dotted:

```

    .....................
    : simple dotted box :
    .....................

    .....................
    : simple dotted box :
    '''''''''''''''''''''

     ...............
    : simple dotted :
    : rounded box   :
     ...............

     ...............
    : simple dotted :
    : rounded box   :
     '''''''''''''''

```

Double:

```

    #####################
    # double border box #
    #####################

     ###############
    # double border #
    #  rounded box  #
     ###############

```

## Rich text blocks

```

    { text block }

    { **bold** _italic_ }

    { [link] }

    { multiline  }
    { text block }


    { text block }[link]

    { text block }[1]


    { multiline text  }[1]
    { block with link }

    {: left-aligned    }
    {: multiline block }

    {: centered        :}
    {: multiline block :}

    { right-aligned   :}
    { multiline block :}

```

[link]: http://example.com "Toto"
[1]: http://example.com

```

```
