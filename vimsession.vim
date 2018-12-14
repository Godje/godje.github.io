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
badd +10 index.html
badd +8 assets/js/index.js
badd +0 assets/js/background.js
badd +0 assets/scss/styles.scss
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
exe 'vert 1resize ' . ((&columns * 117 + 117) / 235)
exe 'vert 2resize ' . ((&columns * 117 + 117) / 235)
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
6
normal! zo
7
normal! zo
8
normal! zo
12
normal! zo
13
normal! zo
14
normal! zo
15
normal! zo
19
normal! zo
19
normal! zo
21
normal! zo
21
normal! zo
let s:l = 21 - ((20 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
21
normal! 025|
wincmd w
argglobal
if bufexists('assets/js/background.js') | buffer assets/js/background.js | else | edit assets/js/background.js | endif
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=20
setlocal fml=1
setlocal fdn=20
setlocal fen
1
normal! zo
26
normal! zo
33
normal! zo
34
normal! zo
61
normal! zo
70
normal! zo
72
normal! zo
61
normal! zo
70
normal! zo
72
normal! zo
40
normal! zo
41
normal! zo
69
normal! zo
78
normal! zo
80
normal! zo
69
normal! zo
78
normal! zo
80
normal! zo
let s:l = 15 - ((14 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
15
normal! 017|
wincmd w
exe 'vert 1resize ' . ((&columns * 117 + 117) / 235)
exe 'vert 2resize ' . ((&columns * 117 + 117) / 235)
tabedit assets/scss/styles.scss
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
let s:l = 6 - ((5 * winheight(0) + 28) / 57)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 010|
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
