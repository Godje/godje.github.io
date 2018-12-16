let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd /media/daniel/therest/linux/github/godje.github.io
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +6 index.html
badd +10 assets/js/index.js
badd +24 assets/js/background.js
badd +6 assets/scss/styles.scss
badd +22 assets/scss/grid.scss
badd +13 assets/scss/home.scss
badd +24 assets/scss/vars.scss
badd +1 /media/daniel/therest/linux/github/godje.github.io/assets/js/pages/Home.js
badd +48 assets/js/pages/Portfolio.js
badd +8 assets/scss/portfolio.scss
badd +25 /media/daniel/therest/linux/github/godje.github.io/assets/portfolioData.json
argglobal
silent! argdel *
set stal=2
edit assets/js/index.js
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 117 + 115) / 230)
exe 'vert 2resize ' . ((&columns * 112 + 115) / 230)
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
9
normal! zo
let s:l = 13 - ((11 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 0
wincmd w
argglobal
if bufexists('assets/js/pages/Portfolio.js') | buffer assets/js/pages/Portfolio.js | else | edit assets/js/pages/Portfolio.js | endif
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
4
normal! zo
5
normal! zo
8
normal! zo
16
normal! zo
17
normal! zo
35
normal! zo
43
normal! zo
45
normal! zo
53
normal! zo
55
normal! zo
55
normal! zo
56
normal! zo
56
normal! zo
60
normal! zo
60
normal! zo
62
normal! zo
62
normal! zo
63
normal! zo
66
normal! zo
67
normal! zo
67
normal! zo
71
normal! zo
75
normal! zo
81
normal! zo
81
normal! zo
82
normal! zo
99
normal! zo
106
normal! zo
106
normal! zo
108
normal! zo
108
normal! zo
109
normal! zo
110
normal! zo
110
normal! zo
111
normal! zo
17
normal! zo
18
normal! zo
22
normal! zo
35
normal! zo
43
normal! zo
45
normal! zo
53
normal! zo
55
normal! zo
55
normal! zo
56
normal! zo
56
normal! zo
60
normal! zo
60
normal! zo
62
normal! zo
62
normal! zo
63
normal! zo
66
normal! zo
67
normal! zo
67
normal! zo
71
normal! zo
75
normal! zo
81
normal! zo
81
normal! zo
99
normal! zo
106
normal! zo
106
normal! zo
108
normal! zo
108
normal! zo
109
normal! zo
110
normal! zo
110
normal! zo
111
normal! zo
34
normal! zo
42
normal! zo
44
normal! zo
52
normal! zo
54
normal! zo
54
normal! zo
55
normal! zo
55
normal! zo
59
normal! zo
59
normal! zo
61
normal! zo
61
normal! zo
62
normal! zo
65
normal! zo
66
normal! zo
66
normal! zo
70
normal! zo
74
normal! zo
80
normal! zo
80
normal! zo
81
normal! zo
81
normal! zo
82
normal! zo
82
normal! zo
91
normal! zo
98
normal! zo
98
normal! zo
105
normal! zo
107
normal! zo
107
normal! zo
109
normal! zo
109
normal! zo
110
normal! zo
105
normal! zo
105
normal! zo
107
normal! zo
107
normal! zo
108
normal! zo
109
normal! zo
109
normal! zo
110
normal! zo
let s:l = 99 - ((39 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
99
normal! 042|
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 117 + 115) / 230)
exe 'vert 2resize ' . ((&columns * 112 + 115) / 230)
tabedit /media/daniel/therest/linux/github/godje.github.io/assets/portfolioData.json
set splitbelow splitright
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 26 - ((24 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
26
normal! 05|
tabedit assets/scss/styles.scss
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd t
set winminheight=1 winheight=1 winminwidth=1 winwidth=1
exe 'vert 1resize ' . ((&columns * 118 + 115) / 230)
exe 'vert 2resize ' . ((&columns * 111 + 115) / 230)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 28 - ((26 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
28
normal! 016|
wincmd w
argglobal
if bufexists('assets/scss/portfolio.scss') | buffer assets/scss/portfolio.scss | else | edit assets/scss/portfolio.scss | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 49 - ((1 * winheight(0) + 28) / 56)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
49
normal! 05|
wincmd w
exe 'vert 1resize ' . ((&columns * 118 + 115) / 230)
exe 'vert 2resize ' . ((&columns * 111 + 115) / 230)
tabnext 1
set stal=1
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOc
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
