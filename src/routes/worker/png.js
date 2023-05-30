

/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,s=286,n=30,r=15,i=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),_=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=new Array(576);e(o);const d=new Array(60);e(d);const u=new Array(512);e(u);const f=new Array(256);e(f);const c=new Array(29);e(c);const p=new Array(n);function g(t,e,a,s,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=s,this.max_length=n,this.has_stree=t&&t.length}let w,m,b;function y(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(p);const v=t=>t<256?u[t]:u[256+(t>>>7)],z=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},k=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,z(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},x=(t,e,a)=>{k(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const s=new Array(16);let n,i,_=0;for(n=1;n<=r;n++)_=_+a[n-1]<<1,s[n]=_;for(i=0;i<=e;i++){let e=t[2*i+1];0!==e&&(t[2*i]=A(s[e]++,e))}},Z=t=>{let e;for(e=0;e<s;e++)t.dyn_ltree[2*e]=0;for(e=0;e<n;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},U=t=>{t.bi_valid>8?z(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},R=(t,e,a,s)=>{const n=2*e,r=2*a;return t[n]<t[r]||t[n]===t[r]&&s[e]<=s[a]},S=(t,e,a)=>{const s=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&R(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!R(e,s,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=s},T=(t,e,s)=>{let n,r,l,h,o=0;if(0!==t.sym_next)do{n=255&t.pending_buf[t.sym_buf+o++],n+=(255&t.pending_buf[t.sym_buf+o++])<<8,r=t.pending_buf[t.sym_buf+o++],0===n?x(t,r,e):(l=f[r],x(t,l+a+1,e),h=i[l],0!==h&&(r-=c[l],k(t,r,h)),n--,l=v(n),x(t,l,s),h=_[l],0!==h&&(n-=p[l],k(t,n,h)))}while(o<t.sym_next);x(t,256,e)},L=(t,e)=>{const a=e.dyn_tree,s=e.stat_desc.static_tree,n=e.stat_desc.has_stree,i=e.stat_desc.elems;let _,l,h,o=-1;for(t.heap_len=0,t.heap_max=573,_=0;_<i;_++)0!==a[2*_]?(t.heap[++t.heap_len]=o=_,t.depth[_]=0):a[2*_+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=o<2?++o:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,n&&(t.static_len-=s[2*h+1]);for(e.max_code=o,_=t.heap_len>>1;_>=1;_--)S(t,a,_);h=i;do{_=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=_,t.heap[--t.heap_max]=l,a[2*h]=a[2*_]+a[2*l],t.depth[h]=(t.depth[_]>=t.depth[l]?t.depth[_]:t.depth[l])+1,a[2*_+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,s=e.max_code,n=e.stat_desc.static_tree,i=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let o,d,u,f,c,p,g=0;for(f=0;f<=r;f++)t.bl_count[f]=0;for(a[2*t.heap[t.heap_max]+1]=0,o=t.heap_max+1;o<573;o++)d=t.heap[o],f=a[2*a[2*d+1]+1]+1,f>h&&(f=h,g++),a[2*d+1]=f,d>s||(t.bl_count[f]++,c=0,d>=l&&(c=_[d-l]),p=a[2*d],t.opt_len+=p*(f+c),i&&(t.static_len+=p*(n[2*d+1]+c)));if(0!==g){do{for(f=h-1;0===t.bl_count[f];)f--;t.bl_count[f]--,t.bl_count[f+1]+=2,t.bl_count[h]--,g-=2}while(g>0);for(f=h;0!==f;f--)for(d=t.bl_count[f];0!==d;)u=t.heap[--o],u>s||(a[2*u+1]!==f&&(t.opt_len+=(f-a[2*u+1])*a[2*u],a[2*u+1]=f),d--)}})(t,e),E(a,o,t.bl_count)},F=(t,e,a)=>{let s,n,r=-1,i=e[1],_=0,l=7,h=4;for(0===i&&(l=138,h=3),e[2*(a+1)+1]=65535,s=0;s<=a;s++)n=i,i=e[2*(s+1)+1],++_<l&&n===i||(_<h?t.bl_tree[2*n]+=_:0!==n?(n!==r&&t.bl_tree[2*n]++,t.bl_tree[32]++):_<=10?t.bl_tree[34]++:t.bl_tree[36]++,_=0,r=n,0===i?(l=138,h=3):n===i?(l=6,h=3):(l=7,h=4))},O=(t,e,a)=>{let s,n,r=-1,i=e[1],_=0,l=7,h=4;for(0===i&&(l=138,h=3),s=0;s<=a;s++)if(n=i,i=e[2*(s+1)+1],!(++_<l&&n===i)){if(_<h)do{x(t,n,t.bl_tree)}while(0!=--_);else 0!==n?(n!==r&&(x(t,n,t.bl_tree),_--),x(t,16,t.bl_tree),k(t,_-3,2)):_<=10?(x(t,17,t.bl_tree),k(t,_-3,3)):(x(t,18,t.bl_tree),k(t,_-11,7));_=0,r=n,0===i?(l=138,h=3):n===i?(l=6,h=3):(l=7,h=4)}};let D=!1;const N=(t,e,a,s)=>{k(t,0+(s?1:0),3),U(t),z(t,a),z(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var I=(t,e,s,n)=>{let r,i,_=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,s=4093624447;for(e=0;e<=31;e++,s>>>=1)if(1&s&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),L(t,t.l_desc),L(t,t.d_desc),_=(t=>{let e;for(F(t,t.dyn_ltree,t.l_desc.max_code),F(t,t.dyn_dtree,t.d_desc.max_code),L(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),r=t.opt_len+3+7>>>3,i=t.static_len+3+7>>>3,i<=r&&(r=i)):r=i=s+5,s+4<=r&&-1!==e?N(t,e,s,n):4===t.strategy||i===r?(k(t,2+(n?1:0),3),T(t,o,d)):(k(t,4+(n?1:0),3),((t,e,a,s)=>{let n;for(k(t,e-257,5),k(t,a-1,5),k(t,s-4,4),n=0;n<s;n++)k(t,t.bl_tree[2*h[n]+1],3);O(t,t.dyn_ltree,e-1),O(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,_+1),T(t,t.dyn_ltree,t.dyn_dtree)),Z(t),n&&U(t)},C={_tr_init:t=>{D||((()=>{let t,e,a,h,y;const v=new Array(16);for(a=0,h=0;h<28;h++)for(c[h]=a,t=0;t<1<<i[h];t++)f[a++]=h;for(f[a-1]=h,y=0,h=0;h<16;h++)for(p[h]=y,t=0;t<1<<_[h];t++)u[y++]=h;for(y>>=7;h<n;h++)for(p[h]=y<<7,t=0;t<1<<_[h]-7;t++)u[256+y++]=h;for(e=0;e<=r;e++)v[e]=0;for(t=0;t<=143;)o[2*t+1]=8,t++,v[8]++;for(;t<=255;)o[2*t+1]=9,t++,v[9]++;for(;t<=279;)o[2*t+1]=7,t++,v[7]++;for(;t<=287;)o[2*t+1]=8,t++,v[8]++;for(E(o,287,v),t=0;t<n;t++)d[2*t+1]=5,d[2*t]=A(t,5);w=new g(o,i,257,s,r),m=new g(d,_,0,n,r),b=new g(new Array(0),l,0,19,7)})(),D=!0),t.l_desc=new y(t.dyn_ltree,w),t.d_desc=new y(t.dyn_dtree,m),t.bl_desc=new y(t.bl_tree,b),t.bi_buf=0,t.bi_valid=0,Z(t)},_tr_stored_block:N,_tr_flush_block:I,_tr_tally:(t,e,s)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=s,0===e?t.dyn_ltree[2*s]++:(t.matches++,e--,t.dyn_ltree[2*(f[s]+a+1)]++,t.dyn_dtree[2*v(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{k(t,2,3),x(t,256,o),(t=>{16===t.bi_valid?(z(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var B=(t,e,a,s)=>{let n=65535&t|0,r=t>>>16&65535|0,i=0;for(;0!==a;){i=a>2e3?2e3:a,a-=i;do{n=n+e[s++]|0,r=r+n|0}while(--i);n%=65521,r%=65521}return n|r<<16|0};const H=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var s=0;s<8;s++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var M=(t,e,a,s)=>{const n=H,r=s+a;t^=-1;for(let a=s;a<r;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},P={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},j={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:K,_tr_stored_block:Y,_tr_flush_block:G,_tr_tally:X,_tr_align:W}=C,{Z_NO_FLUSH:q,Z_PARTIAL_FLUSH:J,Z_FULL_FLUSH:Q,Z_FINISH:V,Z_BLOCK:$,Z_OK:tt,Z_STREAM_END:et,Z_STREAM_ERROR:at,Z_DATA_ERROR:st,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:rt,Z_FILTERED:it,Z_HUFFMAN_ONLY:_t,Z_RLE:lt,Z_FIXED:ht,Z_DEFAULT_STRATEGY:ot,Z_UNKNOWN:dt,Z_DEFLATED:ut}=j,ft=258,ct=262,pt=42,gt=113,wt=666,mt=(t,e)=>(t.msg=P[e],e),bt=t=>2*t-(t>4?9:0),yt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},vt=t=>{let e,a,s,n=t.w_size;e=t.hash_size,s=e;do{a=t.head[--s],t.head[s]=a>=n?a-n:0}while(--e);e=n,s=e;do{a=t.prev[--s],t.prev[s]=a>=n?a-n:0}while(--e)};let zt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const kt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},xt=(t,e)=>{G(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,kt(t.strm)},At=(t,e)=>{t.pending_buf[t.pending++]=e},Et=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},Zt=(t,e,a,s)=>{let n=t.avail_in;return n>s&&(n=s),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=B(t.adler,e,n,a):2===t.state.wrap&&(t.adler=M(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},Ut=(t,e)=>{let a,s,n=t.max_chain_length,r=t.strstart,i=t.prev_length,_=t.nice_match;const l=t.strstart>t.w_size-ct?t.strstart-(t.w_size-ct):0,h=t.window,o=t.w_mask,d=t.prev,u=t.strstart+ft;let f=h[r+i-1],c=h[r+i];t.prev_length>=t.good_match&&(n>>=2),_>t.lookahead&&(_=t.lookahead);do{if(a=e,h[a+i]===c&&h[a+i-1]===f&&h[a]===h[r]&&h[++a]===h[r+1]){r+=2,a++;do{}while(h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&h[++r]===h[++a]&&r<u);if(s=ft-(u-r),r=u-ft,s>i){if(t.match_start=e,i=s,s>=_)break;f=h[r+i-1],c=h[r+i]}}}while((e=d[e&o])>l&&0!=--n);return i<=t.lookahead?i:t.lookahead},Rt=t=>{const e=t.w_size;let a,s,n;do{if(s=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ct)&&(t.window.set(t.window.subarray(e,e+e-s),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),vt(t),s+=e),0===t.strm.avail_in)break;if(a=Zt(t.strm,t.window,t.strstart+t.lookahead,s),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=zt(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=zt(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ct&&0!==t.strm.avail_in)},St=(t,e)=>{let a,s,n,r=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,i=0,_=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,s=t.strstart-t.block_start,a>s+t.strm.avail_in&&(a=s+t.strm.avail_in),a>n&&(a=n),a<r&&(0===a&&e!==V||e===q||a!==s+t.strm.avail_in))break;i=e===V&&a===s+t.strm.avail_in?1:0,Y(t,0,0,i),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,kt(t.strm),s&&(s>a&&(s=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+s),t.strm.next_out),t.strm.next_out+=s,t.strm.avail_out-=s,t.strm.total_out+=s,t.block_start+=s,a-=s),a&&(Zt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===i);return _-=t.strm.avail_in,_&&(_>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=_&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-_,t.strm.next_in),t.strstart),t.strstart+=_,t.insert+=_>t.w_size-t.insert?t.w_size-t.insert:_),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),i?4:e!==q&&e!==V&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(Zt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,r=n>t.w_size?t.w_size:n,s=t.strstart-t.block_start,(s>=r||(s||e===V)&&e!==q&&0===t.strm.avail_in&&s<=n)&&(a=s>n?n:s,i=e===V&&0===t.strm.avail_in&&a===s?1:0,Y(t,t.block_start,a,i),t.block_start+=a,kt(t.strm)),i?3:1)},Tt=(t,e)=>{let a,s;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ct&&(t.match_length=Ut(t,a)),t.match_length>=3)if(s=X(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=zt(t,t.ins_h,t.window[t.strstart+1]);else s=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(s&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===V?(xt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(xt(t,!1),0===t.strm.avail_out)?1:2},Lt=(t,e)=>{let a,s,n;for(;;){if(t.lookahead<ct){if(Rt(t),t.lookahead<ct&&e===q)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ct&&(t.match_length=Ut(t,a),t.match_length<=5&&(t.strategy===it||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,s=X(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=zt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,s&&(xt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(s=X(t,0,t.window[t.strstart-1]),s&&xt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(s=X(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===V?(xt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(xt(t,!1),0===t.strm.avail_out)?1:2};function Ft(t,e,a,s,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=s,this.func=n}const Ot=[new Ft(0,0,0,0,St),new Ft(4,4,8,4,Tt),new Ft(4,5,16,8,Tt),new Ft(4,6,32,32,Tt),new Ft(4,4,16,16,Lt),new Ft(8,16,32,32,Lt),new Ft(8,16,128,128,Lt),new Ft(8,32,128,256,Lt),new Ft(32,128,258,1024,Lt),new Ft(32,258,258,4096,Lt)];function Dt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ut,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),yt(this.dyn_ltree),yt(this.dyn_dtree),yt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),yt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),yt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Nt=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.status!==pt&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&e.status!==gt&&e.status!==wt?1:0},It=t=>{if(Nt(t))return mt(t,at);t.total_in=t.total_out=0,t.data_type=dt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?pt:gt,t.adler=2===e.wrap?0:1,e.last_flush=-2,K(e),tt},Ct=t=>{const e=It(t);var a;return e===tt&&((a=t.state).window_size=2*a.w_size,yt(a.head),a.max_lazy_match=Ot[a.level].max_lazy,a.good_match=Ot[a.level].good_length,a.nice_match=Ot[a.level].nice_length,a.max_chain_length=Ot[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Bt=(t,e,a,s,n,r)=>{if(!t)return at;let i=1;if(e===rt&&(e=6),s<0?(i=0,s=-s):s>15&&(i=2,s-=16),n<1||n>9||a!==ut||s<8||s>15||e<0||e>9||r<0||r>ht||8===s&&1!==i)return mt(t,at);8===s&&(s=9);const _=new Dt;return t.state=_,_.strm=t,_.status=pt,_.wrap=i,_.gzhead=null,_.w_bits=s,_.w_size=1<<_.w_bits,_.w_mask=_.w_size-1,_.hash_bits=n+7,_.hash_size=1<<_.hash_bits,_.hash_mask=_.hash_size-1,_.hash_shift=~~((_.hash_bits+3-1)/3),_.window=new Uint8Array(2*_.w_size),_.head=new Uint16Array(_.hash_size),_.prev=new Uint16Array(_.w_size),_.lit_bufsize=1<<n+6,_.pending_buf_size=4*_.lit_bufsize,_.pending_buf=new Uint8Array(_.pending_buf_size),_.sym_buf=_.lit_bufsize,_.sym_end=3*(_.lit_bufsize-1),_.level=e,_.strategy=r,_.method=a,Ct(t)};var Ht={deflateInit:(t,e)=>Bt(t,e,ut,15,8,ot),deflateInit2:Bt,deflateReset:Ct,deflateResetKeep:It,deflateSetHeader:(t,e)=>Nt(t)||2!==t.state.wrap?at:(t.state.gzhead=e,tt),deflate:(t,e)=>{if(Nt(t)||e>$||e<0)return t?mt(t,at):at;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||a.status===wt&&e!==V)return mt(t,0===t.avail_out?nt:at);const s=a.last_flush;if(a.last_flush=e,0!==a.pending){if(kt(t),0===t.avail_out)return a.last_flush=-1,tt}else if(0===t.avail_in&&bt(e)<=bt(s)&&e!==V)return mt(t,nt);if(a.status===wt&&0!==t.avail_in)return mt(t,nt);if(a.status===pt&&0===a.wrap&&(a.status=gt),a.status===pt){let e=ut+(a.w_bits-8<<4)<<8,s=-1;if(s=a.strategy>=_t||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=s<<6,0!==a.strstart&&(e|=32),e+=31-e%31,Et(a,e),0!==a.strstart&&(Et(a,t.adler>>>16),Et(a,65535&t.adler)),t.adler=1,a.status=gt,kt(t),0!==a.pending)return a.last_flush=-1,tt}if(57===a.status)if(t.adler=0,At(a,31),At(a,139),At(a,8),a.gzhead)At(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),At(a,255&a.gzhead.time),At(a,a.gzhead.time>>8&255),At(a,a.gzhead.time>>16&255),At(a,a.gzhead.time>>24&255),At(a,9===a.level?2:a.strategy>=_t||a.level<2?4:0),At(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(At(a,255&a.gzhead.extra.length),At(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=M(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(At(a,0),At(a,0),At(a,0),At(a,0),At(a,0),At(a,9===a.level?2:a.strategy>=_t||a.level<2?4:0),At(a,3),a.status=gt,kt(t),0!==a.pending)return a.last_flush=-1,tt;if(69===a.status){if(a.gzhead.extra){let e=a.pending,s=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+s>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=M(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,kt(t),0!==a.pending)return a.last_flush=-1,tt;e=0,s-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+s),a.pending),a.pending+=s,a.gzhead.hcrc&&a.pending>e&&(t.adler=M(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,s=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>s&&(t.adler=M(t.adler,a.pending_buf,a.pending-s,s)),kt(t),0!==a.pending)return a.last_flush=-1,tt;s=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>s&&(t.adler=M(t.adler,a.pending_buf,a.pending-s,s)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,s=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>s&&(t.adler=M(t.adler,a.pending_buf,a.pending-s,s)),kt(t),0!==a.pending)return a.last_flush=-1,tt;s=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,At(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>s&&(t.adler=M(t.adler,a.pending_buf,a.pending-s,s))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(kt(t),0!==a.pending))return a.last_flush=-1,tt;At(a,255&t.adler),At(a,t.adler>>8&255),t.adler=0}if(a.status=gt,kt(t),0!==a.pending)return a.last_flush=-1,tt}if(0!==t.avail_in||0!==a.lookahead||e!==q&&a.status!==wt){let s=0===a.level?St(a,e):a.strategy===_t?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Rt(t),0===t.lookahead)){if(e===q)return 1;break}if(t.match_length=0,a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(xt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(xt(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===lt?((t,e)=>{let a,s,n,r;const i=t.window;for(;;){if(t.lookahead<=ft){if(Rt(t),t.lookahead<=ft&&e===q)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,s=i[n],s===i[++n]&&s===i[++n]&&s===i[++n])){r=t.strstart+ft;do{}while(s===i[++n]&&s===i[++n]&&s===i[++n]&&s===i[++n]&&s===i[++n]&&s===i[++n]&&s===i[++n]&&s===i[++n]&&n<r);t.match_length=ft-(r-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=X(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=X(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(xt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===V?(xt(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(xt(t,!1),0===t.strm.avail_out)?1:2})(a,e):Ot[a.level].func(a,e);if(3!==s&&4!==s||(a.status=wt),1===s||3===s)return 0===t.avail_out&&(a.last_flush=-1),tt;if(2===s&&(e===J?W(a):e!==$&&(Y(a,0,0,!1),e===Q&&(yt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),kt(t),0===t.avail_out))return a.last_flush=-1,tt}return e!==V?tt:a.wrap<=0?et:(2===a.wrap?(At(a,255&t.adler),At(a,t.adler>>8&255),At(a,t.adler>>16&255),At(a,t.adler>>24&255),At(a,255&t.total_in),At(a,t.total_in>>8&255),At(a,t.total_in>>16&255),At(a,t.total_in>>24&255)):(Et(a,t.adler>>>16),Et(a,65535&t.adler)),kt(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?tt:et)},deflateEnd:t=>{if(Nt(t))return at;const e=t.state.status;return t.state=null,e===gt?mt(t,st):tt},deflateSetDictionary:(t,e)=>{let a=e.length;if(Nt(t))return at;const s=t.state,n=s.wrap;if(2===n||1===n&&s.status!==pt||s.lookahead)return at;if(1===n&&(t.adler=B(t.adler,e,a,0)),s.wrap=0,a>=s.w_size){0===n&&(yt(s.head),s.strstart=0,s.block_start=0,s.insert=0);let t=new Uint8Array(s.w_size);t.set(e.subarray(a-s.w_size,a),0),e=t,a=s.w_size}const r=t.avail_in,i=t.next_in,_=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Rt(s);s.lookahead>=3;){let t=s.strstart,e=s.lookahead-2;do{s.ins_h=zt(s,s.ins_h,s.window[t+3-1]),s.prev[t&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=t,t++}while(--e);s.strstart=t,s.lookahead=2,Rt(s)}return s.strstart+=s.lookahead,s.block_start=s.strstart,s.insert=s.lookahead,s.lookahead=0,s.match_length=s.prev_length=2,s.match_available=0,t.next_in=i,t.input=_,t.avail_in=r,s.wrap=n,tt},deflateInfo:"pako deflate (from Nodeca project)"};const Mt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Pt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Mt(a,e)&&(t[e]=a[e])}}return t},jt=t=>{let e=0;for(let a=0,s=t.length;a<s;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,s=0,n=t.length;e<n;e++){let n=t[e];a.set(n,s),s+=n.length}return a};let Kt=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Kt=!1}const Yt=new Uint8Array(256);for(let t=0;t<256;t++)Yt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Yt[254]=Yt[254]=1;var Gt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,s,n,r,i=t.length,_=0;for(n=0;n<i;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<i&&(s=t.charCodeAt(n+1),56320==(64512&s)&&(a=65536+(a-55296<<10)+(s-56320),n++)),_+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(_),r=0,n=0;r<_;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<i&&(s=t.charCodeAt(n+1),56320==(64512&s)&&(a=65536+(a-55296<<10)+(s-56320),n++)),a<128?e[r++]=a:a<2048?(e[r++]=192|a>>>6,e[r++]=128|63&a):a<65536?(e[r++]=224|a>>>12,e[r++]=128|a>>>6&63,e[r++]=128|63&a):(e[r++]=240|a>>>18,e[r++]=128|a>>>12&63,e[r++]=128|a>>>6&63,e[r++]=128|63&a);return e};var Xt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Wt=Object.prototype.toString,{Z_NO_FLUSH:qt,Z_SYNC_FLUSH:Jt,Z_FULL_FLUSH:Qt,Z_FINISH:Vt,Z_OK:$t,Z_STREAM_END:te,Z_DEFAULT_COMPRESSION:ee,Z_DEFAULT_STRATEGY:ae,Z_DEFLATED:se}=j;function ne(t){this.options=Pt({level:ee,method:se,chunkSize:16384,windowBits:15,memLevel:8,strategy:ae},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Xt,this.strm.avail_out=0;let a=Ht.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==$t)throw new Error(P[a]);if(e.header&&Ht.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Gt(e.dictionary):"[object ArrayBuffer]"===Wt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Ht.deflateSetDictionary(this.strm,t),a!==$t)throw new Error(P[a]);this._dict_set=!0}}function re(t,e){const a=new ne(e);if(a.push(t,!0),a.err)throw a.msg||P[a.err];return a.result}ne.prototype.push=function(t,e){const a=this.strm,s=this.options.chunkSize;let n,r;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Vt:qt,"string"==typeof t?a.input=Gt(t):"[object ArrayBuffer]"===Wt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(s),a.next_out=0,a.avail_out=s),(r===Jt||r===Qt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=Ht.deflate(a,r),n===te)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=Ht.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===$t;if(0!==a.avail_out){if(r>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},ne.prototype.onData=function(t){this.chunks.push(t)},ne.prototype.onEnd=function(t){t===$t&&(this.result=jt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var ie=ne,_e=re,le=function(t,e){return(e=e||{}).raw=!0,re(t,e)},he=function(t,e){return(e=e||{}).gzip=!0,re(t,e)},oe=j,de={Deflate:ie,deflate:_e,deflateRaw:le,gzip:he,constants:oe};t.Deflate=ie,t.constants=oe,t.default=de,t.deflate=_e,t.deflateRaw=le,t.gzip=he,Object.defineProperty(t,"__esModule",{value:!0})}));

export var UPNG = (function() {

	var _bin = {
		nextZero   : function(data,p)  {  while(data[p]!=0) p++;  return p;  },
		readUshort : function(buff,p)  {  return (buff[p]<< 8) | buff[p+1];  },
		writeUshort: function(buff,p,n){  buff[p] = (n>>8)&255;  buff[p+1] = n&255;  },
		readUint   : function(buff,p)  {  return (buff[p]*(256*256*256)) + ((buff[p+1]<<16) | (buff[p+2]<< 8) | buff[p+3]);  },
		writeUint  : function(buff,p,n){  buff[p]=(n>>24)&255;  buff[p+1]=(n>>16)&255;  buff[p+2]=(n>>8)&255;  buff[p+3]=n&255;  },
		readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
		writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
		readBytes  : function(buff,p,l){  var arr = [];   for(var i=0; i<l; i++) arr.push(buff[p+i]);   return arr;  },
		pad : function(n) { return n.length < 2 ? "0" + n : n; },
		readUTF8 : function(buff, p, l) {
			var s = "", ns;
			for(var i=0; i<l; i++) s += "%" + _bin.pad(buff[p+i].toString(16));
			try {  ns = decodeURIComponent(s); }
			catch(e) {  return _bin.readASCII(buff, p, l);  }
			return  ns;
		}
	}

	function toRGBA8(out)
	{
		var w = out.width, h = out.height;
		if(out.tabs.acTL==null) return [decodeImage(out.data, w, h, out).buffer];

		var frms = [];
		if(out.frames[0].data==null) out.frames[0].data = out.data;

		var len = w*h*4, img = new Uint8Array(len), empty = new Uint8Array(len), prev=new Uint8Array(len);
		for(var i=0; i<out.frames.length; i++)
		{
			var frm = out.frames[i];
			var fx=frm.rect.x, fy=frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
			var fdata = decodeImage(frm.data, fw,fh, out);

			if(i!=0) for(var j=0; j<len; j++) prev[j]=img[j];

			if     (frm.blend==0) _copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
			else if(frm.blend==1) _copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);

			frms.push(img.buffer.slice(0));

			if     (frm.dispose==0) {}
			else if(frm.dispose==1) _copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
			else if(frm.dispose==2) for(var j=0; j<len; j++) img[j]=prev[j];
		}
		return frms;
	}
	function decodeImage(data, w, h, out)
	{
		var area = w*h, bpp = _getBPP(out);
		var bpl = Math.ceil(w*bpp/8);	// bytes per line

		var bf = new Uint8Array(area*4), bf32 = new Uint32Array(bf.buffer);
		var ctype = out.ctype, depth = out.depth;
		var rs = _bin.readUshort;

		//console.log(ctype, depth);
		var time = Date.now();

		if     (ctype==6) { // RGB + alpha
			var qarea = area<<2;
			if(depth== 8) for(var i=0; i<qarea;i+=4) {  bf[i] = data[i];  bf[i+1] = data[i+1];  bf[i+2] = data[i+2];  bf[i+3] = data[i+3]; }
			if(depth==16) for(var i=0; i<qarea;i++ ) {  bf[i] = data[i<<1];  }
		}
		else if(ctype==2) {	// RGB
			var ts=out.tabs["tRNS"];
			if(ts==null) {
				if(depth== 8) for(var i=0; i<area; i++) {  var ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];  }
				if(depth==16) for(var i=0; i<area; i++) {  var ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];  }
			}
			else {  var tr=ts[0], tg=ts[1], tb=ts[2];
				if(depth== 8) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*3;  bf32[i] = (255<<24)|(data[ti+2]<<16)|(data[ti+1]<<8)|data[ti];
					if(data[ti]   ==tr && data[ti+1]   ==tg && data[ti+2]   ==tb) bf[qi+3] = 0;  }
				if(depth==16) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*6;  bf32[i] = (255<<24)|(data[ti+4]<<16)|(data[ti+2]<<8)|data[ti];
					if(rs(data,ti)==tr && rs(data,ti+2)==tg && rs(data,ti+4)==tb) bf[qi+3] = 0;  }
			}
		}
		else if(ctype==3) {	// palette
			var p=out.tabs["PLTE"], ap=out.tabs["tRNS"], tl=ap?ap.length:0;
			//console.log(p, ap);
			if(depth==1) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
				for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>3)]>>(7-((i&7)<<0)))& 1), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
			}
			if(depth==2) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
				for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>2)]>>(6-((i&3)<<1)))& 3), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
			}
			if(depth==4) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
				for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>1)]>>(4-((i&1)<<2)))&15), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
			}
			if(depth==8) for(var i=0; i<area; i++ ) {  var qi=i<<2, j=data[i]                      , cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		else if(ctype==4) {	// gray + alpha
			if(depth== 8)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<1, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+1];  }
			if(depth==16)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<2, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+2];  }
		}
		else if(ctype==0) {	// gray
			var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
			for(var y=0; y<h; y++) {
				var off = y*bpl, to = y*w;
				if     (depth== 1) for(var x=0; x<w; x++) {  var gr=255*((data[off+(x>>>3)]>>>(7 -((x&7)   )))& 1), al=(gr==tr*255)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
				else if(depth== 2) for(var x=0; x<w; x++) {  var gr= 85*((data[off+(x>>>2)]>>>(6 -((x&3)<<1)))& 3), al=(gr==tr* 85)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
				else if(depth== 4) for(var x=0; x<w; x++) {  var gr= 17*((data[off+(x>>>1)]>>>(4 -((x&1)<<2)))&15), al=(gr==tr* 17)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
				else if(depth== 8) for(var x=0; x<w; x++) {  var gr=data[off+     x], al=(gr                 ==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
				else if(depth==16) for(var x=0; x<w; x++) {  var gr=data[off+(x<<1)], al=(rs(data,off+(x<<1))==tr)?0:255;  bf32[to+x]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
			}
		}
		//console.log(Date.now()-time);
		return bf;
	}



	function decode(buff)
	{
		var data = new Uint8Array(buff), offset = 8, bin = _bin, rUs = bin.readUshort, rUi = bin.readUint;
		var out = {tabs:{}, frames:[]};
		var dd = new Uint8Array(data.length), doff = 0;	 // put all IDAT data into it
		var fd, foff = 0;	// frames

		var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
		for(var i=0; i<8; i++) if(data[i]!=mgck[i]) throw "The input is not a PNG file!";

		while(offset<data.length)
		{
			var len  = bin.readUint(data, offset);  offset += 4;
			var type = bin.readASCII(data, offset, 4);  offset += 4;
			//console.log(type,len);

			if     (type=="IHDR")  {  _IHDR(data, offset, out);  }
			else if(type=="iCCP")  {
				var off = offset;  while(data[off]!=0) off++;
				var nam = bin.readASCII(data,offset,off-offset);
				var cpr = data[off+1];
				var fil = data.slice(off+2,offset+len);
				var res = null;
				try { res = _inflate(fil); } catch(e) {  res = inflateRaw(fil);  }
				out.tabs[type] = res;
			}
			else if(type=="CgBI")  {  out.tabs[type] = data.slice(offset,offset+4);  }
			else if(type=="IDAT") {
				for(var i=0; i<len; i++) dd[doff+i] = data[offset+i];
				doff += len;
			}
			else if(type=="acTL")  {
				out.tabs[type] = {  num_frames:rUi(data, offset), num_plays:rUi(data, offset+4)  };
				fd = new Uint8Array(data.length);
			}
			else if(type=="fcTL")  {
				if(foff!=0) {  var fr = out.frames[out.frames.length-1];
					fr.data = _decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);  foff=0;
				}
				var rct = {x:rUi(data, offset+12),y:rUi(data, offset+16),width:rUi(data, offset+4),height:rUi(data, offset+8)};
				var del = rUs(data, offset+22);  del = rUs(data, offset+20) / (del==0?100:del);
				var frm = {rect:rct, delay:Math.round(del*1000), dispose:data[offset+24], blend:data[offset+25]};
				//console.log(frm);
				out.frames.push(frm);
			}
			else if(type=="fdAT") {
				for(var i=0; i<len-4; i++) fd[foff+i] = data[offset+i+4];
				foff += len-4;
			}
			else if(type=="pHYs") {
				out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset+4), data[offset+8]];
			}
			else if(type=="cHRM") {
				out.tabs[type] = [];
				for(var i=0; i<8; i++) out.tabs[type].push(bin.readUint(data, offset+i*4));
			}
			else if(type=="tEXt" || type=="zTXt") {
				if(out.tabs[type]==null) out.tabs[type] = {};
				var nz = bin.nextZero(data, offset);
				var keyw = bin.readASCII(data, offset, nz-offset);
				var text, tl=offset+len-nz-1;
				if(type=="tEXt") text = bin.readASCII(data, nz+1, tl);
				else {
					var bfr = _inflate(data.slice(nz+2,nz+2+tl));
					text = bin.readUTF8(bfr,0,bfr.length);
				}
				out.tabs[type][keyw] = text;
			}
			else if(type=="iTXt") {
				if(out.tabs[type]==null) out.tabs[type] = {};
				var nz = 0, off = offset;
				nz = bin.nextZero(data, off);
				var keyw = bin.readASCII(data, off, nz-off);  off = nz + 1;
				var cflag = data[off], cmeth = data[off+1];  off+=2;
				nz = bin.nextZero(data, off);
				var ltag = bin.readASCII(data, off, nz-off);  off = nz + 1;
				nz = bin.nextZero(data, off);
				var tkeyw = bin.readUTF8(data, off, nz-off);  off = nz + 1;
				var text, tl=len-(off-offset);
				if(cflag==0) text  = bin.readUTF8(data, off, tl);
				else {
					var bfr = _inflate(data.slice(off,off+tl));
					text = bin.readUTF8(bfr,0,bfr.length);
				}
				out.tabs[type][keyw] = text;
			}
			else if(type=="PLTE") {
				out.tabs[type] = bin.readBytes(data, offset, len);
			}
			else if(type=="hIST") {
				var pl = out.tabs["PLTE"].length/3;
				out.tabs[type] = [];  for(var i=0; i<pl; i++) out.tabs[type].push(rUs(data, offset+i*2));
			}
			else if(type=="tRNS") {
				if     (out.ctype==3) out.tabs[type] = bin.readBytes(data, offset, len);
				else if(out.ctype==0) out.tabs[type] = rUs(data, offset);
				else if(out.ctype==2) out.tabs[type] = [ rUs(data,offset),rUs(data,offset+2),rUs(data,offset+4) ];
				//else console.log("tRNS for unsupported color type",out.ctype, len);
			}
			else if(type=="gAMA") out.tabs[type] = bin.readUint(data, offset)/100000;
			else if(type=="sRGB") out.tabs[type] = data[offset];
			else if(type=="bKGD")
			{
				if     (out.ctype==0 || out.ctype==4) out.tabs[type] = [rUs(data, offset)];
				else if(out.ctype==2 || out.ctype==6) out.tabs[type] = [rUs(data, offset), rUs(data, offset+2), rUs(data, offset+4)];
				else if(out.ctype==3) out.tabs[type] = data[offset];
			}
			else if(type=="IEND") {
				break;
			}
			//else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }
			offset += len;
			var crc = bin.readUint(data, offset);  offset += 4;
		}
		if(foff!=0) {  var fr = out.frames[out.frames.length-1];
			fr.data = _decompress(out, fd.slice(0,foff), fr.rect.width, fr.rect.height);
		}
		out.data = _decompress(out, dd, out.width, out.height);

		delete out.compress;  delete out.interlace;  delete out.filter;
		return out;
	}

	function _decompress(out, dd, w, h) {
		var time = Date.now();
		var bpp = _getBPP(out), bpl = Math.ceil(w*bpp/8), buff = new Uint8Array((bpl+1+out.interlace)*h);
		if(out.tabs["CgBI"]) dd = inflateRaw(dd,buff);
		else                 dd = _inflate(dd,buff);
		//console.log(dd.length, buff.length);
		//console.log(Date.now()-time);

		var time=Date.now();
		if     (out.interlace==0) dd = _filterZero(dd, out, 0, w, h);
		else if(out.interlace==1) dd = _readInterlace(dd, out);
		//console.log(Date.now()-time);
		return dd;
	}

	function _inflate(data, buff) {  var out=inflateRaw(new Uint8Array(data.buffer, 2,data.length-6),buff);  return out;  }

	var inflateRaw=function(){var H={};H.H={};H.H.N=function(N,W){var R=Uint8Array,i=0,m=0,J=0,h=0,Q=0,X=0,u=0,w=0,d=0,v,C;
	if(N[0]==3&&N[1]==0)return W?W:new R(0);var V=H.H,n=V.b,A=V.e,l=V.R,M=V.n,I=V.A,e=V.Z,b=V.m,Z=W==null;
	if(Z)W=new R(N.length>>>2<<5);while(i==0){i=n(N,d,1);m=n(N,d+1,2);d+=3;if(m==0){if((d&7)!=0)d+=8-(d&7);
	var D=(d>>>3)+4,q=N[D-4]|N[D-3]<<8;if(Z)W=H.H.W(W,w+q);W.set(new R(N.buffer,N.byteOffset+D,q),w);d=D+q<<3;
	w+=q;continue}if(Z)W=H.H.W(W,w+(1<<17));if(m==1){v=b.J;C=b.h;X=(1<<9)-1;u=(1<<5)-1}if(m==2){J=A(N,d,5)+257;
	h=A(N,d+5,5)+1;Q=A(N,d+10,4)+4;d+=14;var E=d,j=1;for(var c=0;c<38;c+=2){b.Q[c]=0;b.Q[c+1]=0}for(var c=0;
	c<Q;c++){var K=A(N,d+c*3,3);b.Q[(b.X[c]<<1)+1]=K;if(K>j)j=K}d+=3*Q;M(b.Q,j);I(b.Q,j,b.u);v=b.w;C=b.d;
	d=l(b.u,(1<<j)-1,J+h,N,d,b.v);var r=V.V(b.v,0,J,b.C);X=(1<<r)-1;var S=V.V(b.v,J,h,b.D);u=(1<<S)-1;M(b.C,r);
	I(b.C,r,v);M(b.D,S);I(b.D,S,C)}while(!0){var T=v[e(N,d)&X];d+=T&15;var p=T>>>4;if(p>>>8==0){W[w++]=p}else if(p==256){break}else{var z=w+p-254;
	if(p>264){var _=b.q[p-257];z=w+(_>>>3)+A(N,d,_&7);d+=_&7}var $=C[e(N,d)&u];d+=$&15;var s=$>>>4,Y=b.c[s],a=(Y>>>4)+n(N,d,Y&15);
	d+=Y&15;while(w<z){W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a];W[w]=W[w++-a]}w=z}}}return W.length==w?W:W.slice(0,w)};
	H.H.W=function(N,W){var R=N.length;if(W<=R)return N;var V=new Uint8Array(R<<1);V.set(N,0);return V};
	H.H.R=function(N,W,R,V,n,A){var l=H.H.e,M=H.H.Z,I=0;while(I<R){var e=N[M(V,n)&W];n+=e&15;var b=e>>>4;
	if(b<=15){A[I]=b;I++}else{var Z=0,m=0;if(b==16){m=3+l(V,n,2);n+=2;Z=A[I-1]}else if(b==17){m=3+l(V,n,3);
	n+=3}else if(b==18){m=11+l(V,n,7);n+=7}var J=I+m;while(I<J){A[I]=Z;I++}}}return n};H.H.V=function(N,W,R,V){var n=0,A=0,l=V.length>>>1;
	while(A<R){var M=N[A+W];V[A<<1]=0;V[(A<<1)+1]=M;if(M>n)n=M;A++}while(A<l){V[A<<1]=0;V[(A<<1)+1]=0;A++}return n};
	H.H.n=function(N,W){var R=H.H.m,V=N.length,n,A,l,M,I,e=R.j;for(var M=0;M<=W;M++)e[M]=0;for(M=1;M<V;M+=2)e[N[M]]++;
	var b=R.K;n=0;e[0]=0;for(A=1;A<=W;A++){n=n+e[A-1]<<1;b[A]=n}for(l=0;l<V;l+=2){I=N[l+1];if(I!=0){N[l]=b[I];
	b[I]++}}};H.H.A=function(N,W,R){var V=N.length,n=H.H.m,A=n.r;for(var l=0;l<V;l+=2)if(N[l+1]!=0){var M=l>>1,I=N[l+1],e=M<<4|I,b=W-I,Z=N[l]<<b,m=Z+(1<<b);
	while(Z!=m){var J=A[Z]>>>15-W;R[J]=e;Z++}}};H.H.l=function(N,W){var R=H.H.m.r,V=15-W;for(var n=0;n<N.length;
	n+=2){var A=N[n]<<W-N[n+1];N[n]=R[A]>>>V}};H.H.M=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8};
	H.H.I=function(N,W,R){R=R<<(W&7);var V=W>>>3;N[V]|=R;N[V+1]|=R>>>8;N[V+2]|=R>>>16};H.H.e=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8)>>>(W&7)&(1<<R)-1};
	H.H.b=function(N,W,R){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)&(1<<R)-1};H.H.Z=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16)>>>(W&7)};
	H.H.i=function(N,W){return(N[W>>>3]|N[(W>>>3)+1]<<8|N[(W>>>3)+2]<<16|N[(W>>>3)+3]<<24)>>>(W&7)};H.H.m=function(){var N=Uint16Array,W=Uint32Array;
	return{K:new N(16),j:new N(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new N(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new W(32),J:new N(512),_:[],h:new N(32),$:[],w:new N(32768),C:[],v:[],d:new N(32768),D:[],u:new N(512),Q:[],r:new N(1<<15),s:new W(286),Y:new W(30),a:new W(19),t:new W(15e3),k:new N(1<<16),g:new N(1<<15)}}();
	(function(){var N=H.H.m,W=1<<15;for(var R=0;R<W;R++){var V=R;V=(V&2863311530)>>>1|(V&1431655765)<<1;
	V=(V&3435973836)>>>2|(V&858993459)<<2;V=(V&4042322160)>>>4|(V&252645135)<<4;V=(V&4278255360)>>>8|(V&16711935)<<8;
	N.r[R]=(V>>>16|V<<16)>>>17}function n(A,l,M){while(l--!=0)A.push(0,M)}for(var R=0;R<32;R++){N.q[R]=N.S[R]<<3|N.T[R];
	N.c[R]=N.p[R]<<4|N.z[R]}n(N._,144,8);n(N._,255-143,9);n(N._,279-255,7);n(N._,287-279,8);H.H.n(N._,9);
	H.H.A(N._,9,N.J);H.H.l(N._,9);n(N.$,32,5);H.H.n(N.$,5);H.H.A(N.$,5,N.h);H.H.l(N.$,5);n(N.Q,19,0);n(N.C,286,0);
	n(N.D,30,0);n(N.v,320,0)}());return H.H.N}()


	function _readInterlace(data, out)
	{
		var w = out.width, h = out.height;
		var bpp = _getBPP(out), cbpp = bpp>>3, bpl = Math.ceil(w*bpp/8);
		var img = new Uint8Array( h * bpl );
		var di = 0;

		var starting_row  = [ 0, 0, 4, 0, 2, 0, 1 ];
		var starting_col  = [ 0, 4, 0, 2, 0, 1, 0 ];
		var row_increment = [ 8, 8, 8, 4, 4, 2, 2 ];
		var col_increment = [ 8, 8, 4, 4, 2, 2, 1 ];

		var pass=0;
		while(pass<7)
		{
			var ri = row_increment[pass], ci = col_increment[pass];
			var sw = 0, sh = 0;
			var cr = starting_row[pass];  while(cr<h) {  cr+=ri;  sh++;  }
			var cc = starting_col[pass];  while(cc<w) {  cc+=ci;  sw++;  }
			var bpll = Math.ceil(sw*bpp/8);
			_filterZero(data, out, di, sw, sh);

			var y=0, row = starting_row[pass];
			while(row<h)
			{
				var col = starting_col[pass];
				var cdi = (di+y*bpll)<<3;

				while(col<w)
				{
					if(bpp==1) {
						var val = data[cdi>>3];  val = (val>>(7-(cdi&7)))&1;
						img[row*bpl + (col>>3)] |= (val << (7-((col&7)<<0)));
					}
					if(bpp==2) {
						var val = data[cdi>>3];  val = (val>>(6-(cdi&7)))&3;
						img[row*bpl + (col>>2)] |= (val << (6-((col&3)<<1)));
					}
					if(bpp==4) {
						var val = data[cdi>>3];  val = (val>>(4-(cdi&7)))&15;
						img[row*bpl + (col>>1)] |= (val << (4-((col&1)<<2)));
					}
					if(bpp>=8) {
						var ii = row*bpl+col*cbpp;
						for(var j=0; j<cbpp; j++) img[ii+j] = data[(cdi>>3)+j];
					}
					cdi+=bpp;  col+=ci;
				}
				y++;  row += ri;
			}
			if(sw*sh!=0) di += sh * (1 + bpll);
			pass = pass + 1;
		}
		return img;
	}

	function _getBPP(out) {
		var noc = [1,null,3,1,2,null,4][out.ctype];
		return noc * out.depth;
	}

	function _filterZero(data, out, off, w, h)
	{
		var bpp = _getBPP(out), bpl = Math.ceil(w*bpp/8);
		bpp = Math.ceil(bpp/8);

		var i,di, type=data[off], x=0;

		if(type>1) data[off]=[0,0,1][type-2];
		if(type==3) for(x=bpp; x<bpl; x++) data[x+1] = (data[x+1] + (data[x+1-bpp]>>>1) )&255;

		for(var y=0; y<h; y++)  {
			i = off+y*bpl; di = i+y+1;
			type = data[di-1]; x=0;

			if     (type==0)   for(; x<bpl; x++) data[i+x] = data[di+x];
			else if(type==1) { for(; x<bpp; x++) data[i+x] = data[di+x];
							   for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpp]);  }
			else if(type==2) { for(; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpl]);  }
			else if(type==3) { for(; x<bpp; x++) data[i+x] = (data[di+x] + ( data[i+x-bpl]>>>1));
							   for(; x<bpl; x++) data[i+x] = (data[di+x] + ((data[i+x-bpl]+data[i+x-bpp])>>>1) );  }
			else             { for(; x<bpp; x++) data[i+x] = (data[di+x] + _paeth(0, data[i+x-bpl], 0));
							   for(; x<bpl; x++) data[i+x] = (data[di+x] + _paeth(data[i+x-bpp], data[i+x-bpl], data[i+x-bpp-bpl]) );  }
		}
		return data;
	}

	function _paeth(a,b,c)
	{
		var p = a+b-c, pa = (p-a), pb = (p-b), pc = (p-c);
		if (pa*pa <= pb*pb && pa*pa <= pc*pc)  return a;
		else if (pb*pb <= pc*pc)  return b;
		return c;
	}

	function _IHDR(data, offset, out)
	{
		out.width  = _bin.readUint(data, offset);  offset += 4;
		out.height = _bin.readUint(data, offset);  offset += 4;
		out.depth     = data[offset];  offset++;
		out.ctype     = data[offset];  offset++;
		out.compress  = data[offset];  offset++;
		out.filter    = data[offset];  offset++;
		out.interlace = data[offset];  offset++;
	}

	function _copyTile(sb, sw, sh, tb, tw, th, xoff, yoff, mode)
	{
		var w = Math.min(sw,tw), h = Math.min(sh,th);
		var si=0, ti=0;
		for(var y=0; y<h; y++)
			for(var x=0; x<w; x++)
			{
				if(xoff>=0 && yoff>=0) {  si = (y*sw+x)<<2;  ti = (( yoff+y)*tw+xoff+x)<<2;  }
				else                   {  si = ((-yoff+y)*sw-xoff+x)<<2;  ti = (y*tw+x)<<2;  }

				if     (mode==0) {  tb[ti] = sb[si];  tb[ti+1] = sb[si+1];  tb[ti+2] = sb[si+2];  tb[ti+3] = sb[si+3];  }
				else if(mode==1) {
					var fa = sb[si+3]*(1/255), fr=sb[si]*fa, fg=sb[si+1]*fa, fb=sb[si+2]*fa;
					var ba = tb[ti+3]*(1/255), br=tb[ti]*ba, bg=tb[ti+1]*ba, bb=tb[ti+2]*ba;

					var ifa=1-fa, oa = fa+ba*ifa, ioa = (oa==0?0:1/oa);
					tb[ti+3] = 255*oa;
					tb[ti+0] = (fr+br*ifa)*ioa;
					tb[ti+1] = (fg+bg*ifa)*ioa;
					tb[ti+2] = (fb+bb*ifa)*ioa;
				}
				else if(mode==2){	// copy only differences, otherwise zero
					var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2];
					var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2];
					if(fa==ba && fr==br && fg==bg && fb==bb) {  tb[ti]=0;  tb[ti+1]=0;  tb[ti+2]=0;  tb[ti+3]=0;  }
					else {  tb[ti]=fr;  tb[ti+1]=fg;  tb[ti+2]=fb;  tb[ti+3]=fa;  }
				}
				else if(mode==3){	// check if can be blended
					var fa = sb[si+3], fr=sb[si], fg=sb[si+1], fb=sb[si+2];
					var ba = tb[ti+3], br=tb[ti], bg=tb[ti+1], bb=tb[ti+2];
					if(fa==ba && fr==br && fg==bg && fb==bb) continue;
					//if(fa!=255 && ba!=0) return false;
					if(fa<220 && ba>20) return false;
				}
			}
		return true;
	}

	return {
		decode:decode,
		toRGBA8:toRGBA8,
		_paeth:_paeth,
		_copyTile:_copyTile,
		_bin:_bin
	};

})();









(function() {
	var _copyTile = UPNG._copyTile, _bin=UPNG._bin, paeth = UPNG._paeth;
	var crcLib = {
		table : ( function() {
		   var tab = new Uint32Array(256);
		   for (var n=0; n<256; n++) {
				var c = n;
				for (var k=0; k<8; k++) {
					if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
					else        c = c >>> 1;
				}
				tab[n] = c;  }
			return tab;  })(),
		update : function(c, buf, off, len) {
			for (var i=0; i<len; i++)  c = crcLib.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
			return c;
		},
		crc : function(b,o,l)  {  return crcLib.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
	}


	function addErr(er, tg, ti, f) {
		tg[ti]+=(er[0]*f)>>4;  tg[ti+1]+=(er[1]*f)>>4;  tg[ti+2]+=(er[2]*f)>>4;  tg[ti+3]+=(er[3]*f)>>4;
	}
	function N(x) {  return Math.max(0, Math.min(255, x));  }
	function D(a,b) {  var dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2], da=a[3]-b[3];  return (dr*dr + dg*dg + db*db + da*da);  }

	// MTD: 0: None, 1: floyd-steinberg, 2: Bayer
	function dither(sb, w, h, plte, tb, oind, MTD) {
		if(MTD==null) MTD=1;

		var pc=plte.length, nplt = [], rads=[];
		for(var i=0; i<pc; i++) {
			var c = plte[i];
			nplt.push([((c>>>0)&255), ((c>>>8)&255), ((c>>>16)&255), ((c>>>24)&255)]);
		}
		for(var i=0; i<pc; i++) {
			var ne=0xffffffff, ni=0;
			for(var j=0; j<pc; j++) {  var ce=D(nplt[i],nplt[j]);  if(j!=i && ce<ne) {  ne=ce;  ni=j;  }  }
			var hd = Math.sqrt(ne)/2;
			rads[i] = ~~(hd*hd);
		}

		var tb32 = new Uint32Array(tb.buffer);
		var err = new Int16Array(w*h*4);

		/*
		var S=2, M = [
			0,2,
		    3,1];  //*/
		//*
		var S=4, M = [
			 0, 8, 2,10,
		    12, 4,14, 6,
			 3,11, 1, 9,
			15, 7,13, 5 ];  //*/
		for(var i=0; i<M.length; i++) M[i] = 255*(-0.5 + (M[i]+0.5)/(S*S));

		for(var y=0; y<h; y++) {
			for(var x=0; x<w; x++) {
				var i = (y*w+x)*4;

				var cc;
				if(MTD!=2) cc = [N(sb[i]+err[i]), N(sb[i+1]+err[i+1]), N(sb[i+2]+err[i+2]), N(sb[i+3]+err[i+3])];
				else {
					var ce = M[(y&(S-1))*S+(x&(S-1))];
					cc = [N(sb[i]+ce), N(sb[i+1]+ce), N(sb[i+2]+ce), N(sb[i+3]+ce)];
				}

				var ni=0, nd = 0xffffff;
				for(var j=0; j<pc; j++) {
					var cd = D(cc,nplt[j]);
					if(cd<nd) {  nd=cd;  ni=j;  }
				}

				var nc = nplt[ni];
				var er = [cc[0]-nc[0], cc[1]-nc[1], cc[2]-nc[2], cc[3]-nc[3]];

				if(MTD==1) {
					//addErr(er, err, i+4, 16);
					if(x!=w-1) addErr(er, err, i+4    , 7);
					if(y!=h-1) {
						if(x!=  0) addErr(er, err, i+4*w-4, 3);
								   addErr(er, err, i+4*w  , 5);
						if(x!=w-1) addErr(er, err, i+4*w+4, 1);
					}//*/
				}
				oind[i>>2] = ni;  tb32[i>>2] = plte[ni];
			}
		}
	}


	function encode(bufs, w, h, ps, dels, tabs, forbidPlte)
	{
		if(ps==null) ps=0;
		if(forbidPlte==null) forbidPlte = false;

		var nimg = compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte,false]);
		compressPNG(nimg, -1);

		return _main(nimg, w, h, dels, tabs);
	}

	function encodeLL(bufs, w, h, cc, ac, depth, dels, tabs) {
		var nimg = {  ctype: 0 + (cc==1 ? 0 : 2) + (ac==0 ? 0 : 4),      depth: depth,  frames: []  };

		var time = Date.now();
		var bipp = (cc+ac)*depth, bipl = bipp * w;
		for(var i=0; i<bufs.length; i++)
			nimg.frames.push({  rect:{x:0,y:0,width:w,height:h},  img:new Uint8Array(bufs[i]), blend:0, dispose:1, bpp:Math.ceil(bipp/8), bpl:Math.ceil(bipl/8)  });

		compressPNG(nimg, 0, true);

		var out = _main(nimg, w, h, dels, tabs);
		return out;
	}

	function _main(nimg, w, h, dels, tabs) {
		if(tabs==null) tabs={};
		var crc = crcLib.crc, wUi = _bin.writeUint, wUs = _bin.writeUshort, wAs = _bin.writeASCII;
		var offset = 8, anim = nimg.frames.length>1, pltAlpha = false;

		var cicc;

		var leng = 8 + (16+5+4) /*+ (9+4)*/ + (anim ? 20 : 0);
		if(tabs["sRGB"]!=null) leng += 8+1+4;
		if(tabs["pHYs"]!=null) leng += 8+9+4;
		if(tabs["iCCP"]!=null) {  cicc = pako.deflate(tabs["iCCP"]);  leng += 8 + 11 + 2 + cicc.length + 4;  }
		if(nimg.ctype==3) {
			var dl = nimg.plte.length;
			for(var i=0; i<dl; i++) if((nimg.plte[i]>>>24)!=255) pltAlpha = true;
			leng += (8 + dl*3 + 4) + (pltAlpha ? (8 + dl*1 + 4) : 0);
		}
		for(var j=0; j<nimg.frames.length; j++)
		{
			var fr = nimg.frames[j];
			if(anim) leng += 38;
			leng += fr.cimg.length + 12;
			if(j!=0) leng+=4;
		}
		leng += 12;

		var data = new Uint8Array(leng);
		var wr=[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
		for(var i=0; i<8; i++) data[i]=wr[i];

		wUi(data,offset, 13);     offset+=4;
		wAs(data,offset,"IHDR");  offset+=4;
		wUi(data,offset,w);  offset+=4;
		wUi(data,offset,h);  offset+=4;
		data[offset] = nimg.depth;  offset++;  // depth
		data[offset] = nimg.ctype;  offset++;  // ctype
		data[offset] = 0;  offset++;  // compress
		data[offset] = 0;  offset++;  // filter
		data[offset] = 0;  offset++;  // interlace
		wUi(data,offset,crc(data,offset-17,17));  offset+=4; // crc

		// 13 bytes to say, that it is sRGB
		if(tabs["sRGB"]!=null) {
			wUi(data,offset, 1);      offset+=4;
			wAs(data,offset,"sRGB");  offset+=4;
			data[offset] = tabs["sRGB"];  offset++;
			wUi(data,offset,crc(data,offset-5,5));  offset+=4; // crc
		}
		if(tabs["iCCP"]!=null) {
			var sl = 11+2+cicc.length;
			wUi(data,offset, sl);  offset+=4;
			wAs(data,offset,"iCCP");  offset+=4;
			wAs(data,offset,"ICC profile");  offset+=11;  offset+=2;
			data.set(cicc, offset);  offset+=cicc.length;
			wUi(data,offset,crc(data,offset-(sl+4),sl+4));  offset+=4; // crc
		}
		if(tabs["pHYs"]!=null) {
			wUi(data,offset, 9);      offset+=4;
			wAs(data,offset,"pHYs");  offset+=4;
			wUi(data,offset, tabs["pHYs"][0]);      offset+=4;
			wUi(data,offset, tabs["pHYs"][1]);      offset+=4;
			data[offset]=tabs["pHYs"][2];			offset++;
			wUi(data,offset,crc(data,offset-13,13));  offset+=4; // crc
		}

		if(anim) {
			wUi(data,offset, 8);      offset+=4;
			wAs(data,offset,"acTL");  offset+=4;
			wUi(data,offset, nimg.frames.length);     offset+=4;
			wUi(data,offset, tabs["loop"]!=null?tabs["loop"]:0);      offset+=4;
			wUi(data,offset,crc(data,offset-12,12));  offset+=4; // crc
		}

		if(nimg.ctype==3) {
			var dl = nimg.plte.length;
			wUi(data,offset, dl*3);  offset+=4;
			wAs(data,offset,"PLTE");  offset+=4;
			for(var i=0; i<dl; i++){
				var ti=i*3, c=nimg.plte[i], r=(c)&255, g=(c>>>8)&255, b=(c>>>16)&255;
				data[offset+ti+0]=r;  data[offset+ti+1]=g;  data[offset+ti+2]=b;
			}
			offset+=dl*3;
			wUi(data,offset,crc(data,offset-dl*3-4,dl*3+4));  offset+=4; // crc

			if(pltAlpha) {
				wUi(data,offset, dl);  offset+=4;
				wAs(data,offset,"tRNS");  offset+=4;
				for(var i=0; i<dl; i++)  data[offset+i]=(nimg.plte[i]>>>24)&255;
				offset+=dl;
				wUi(data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc
			}
		}

		var fi = 0;
		for(var j=0; j<nimg.frames.length; j++)
		{
			var fr = nimg.frames[j];
			if(anim) {
				wUi(data, offset, 26);     offset+=4;
				wAs(data, offset,"fcTL");  offset+=4;
				wUi(data, offset, fi++);   offset+=4;
				wUi(data, offset, fr.rect.width );   offset+=4;
				wUi(data, offset, fr.rect.height);   offset+=4;
				wUi(data, offset, fr.rect.x);   offset+=4;
				wUi(data, offset, fr.rect.y);   offset+=4;
				wUs(data, offset, dels[j]);   offset+=2;
				wUs(data, offset,  1000);   offset+=2;
				data[offset] = fr.dispose;  offset++;	// dispose
				data[offset] = fr.blend  ;  offset++;	// blend
				wUi(data,offset,crc(data,offset-30,30));  offset+=4; // crc
			}

			var imgd = fr.cimg, dl = imgd.length;
			wUi(data,offset, dl+(j==0?0:4));     offset+=4;
			var ioff = offset;
			wAs(data,offset,(j==0)?"IDAT":"fdAT");  offset+=4;
			if(j!=0) {  wUi(data, offset, fi++);  offset+=4;  }
			data.set(imgd,offset);
			offset += dl;
			wUi(data,offset,crc(data,ioff,offset-ioff));  offset+=4; // crc
		}

		wUi(data,offset, 0);     offset+=4;
		wAs(data,offset,"IEND");  offset+=4;
		wUi(data,offset,crc(data,offset-4,4));  offset+=4; // crc

		return data.buffer;
	}

	function compressPNG(out, filter, levelZero) {
		for(var i=0; i<out.frames.length; i++) {
			var frm = out.frames[i], nw=frm.rect.width, nh=frm.rect.height;
			var fdata = new Uint8Array(nh*frm.bpl+nh);
			frm.cimg = _filterZero(frm.img,nh,frm.bpp,frm.bpl,fdata, filter, levelZero);
		}
	}



	function compress(bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
	{
		//var time = Date.now();
		var onlyBlend = prms[0], evenCrd = prms[1], forbidPrev = prms[2], minBits = prms[3], forbidPlte = prms[4], dith=prms[5];

		var ctype = 6, depth = 8, alphaAnd=255

		for(var j=0; j<bufs.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
			var img = new Uint8Array(bufs[j]), ilen = img.length;
			for(var i=0; i<ilen; i+=4) alphaAnd &= img[i+3];
		}
		var gotAlpha = (alphaAnd!=255);

		//console.log("alpha check", Date.now()-time);  time = Date.now();

		//var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"
		var frms = framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
		//console.log("framize", Date.now()-time);  time = Date.now();

		var cmap={}, plte=[], inds=[];

		if(ps!=0) {
			var nbufs = [];  for(var i=0; i<frms.length; i++) nbufs.push(frms[i].img.buffer);

			var abuf = concatRGBA(nbufs), qres = quantize(abuf, ps);

			for(var i=0; i<qres.plte.length; i++) plte.push(qres.plte[i].est.rgba);

			var cof = 0;
			for(var i=0; i<frms.length; i++) {
				var frm=frms[i], bln=frm.img.length, ind = new Uint8Array(qres.inds.buffer, cof>>2, bln>>2);  inds.push(ind);
				var bb = new Uint8Array(qres.abuf,cof,bln);

				//console.log(frm.img, frm.width, frm.height);
				//var time = Date.now();
				if(dith) dither(frm.img, frm.rect.width, frm.rect.height, plte, bb, ind);
				//console.log(Date.now()-time);
				frm.img.set(bb);  cof+=bln;
			}

			//console.log("quantize", Date.now()-time);  time = Date.now();
		}
		else {
			// what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
			for(var j=0; j<frms.length; j++)  {  // when not quantized, other frames can contain colors, that are not in an initial frame
				var frm = frms[j], img32 = new Uint32Array(frm.img.buffer), nw=frm.rect.width, ilen = img32.length;
				var ind = new Uint8Array(ilen);  inds.push(ind);
				for(var i=0; i<ilen; i++) {
					var c = img32[i];
					if     (i!=0 && c==img32[i- 1]) ind[i]=ind[i-1];
					else if(i>nw && c==img32[i-nw]) ind[i]=ind[i-nw];
					else {
						var cmc = cmap[c];
						if(cmc==null) {  cmap[c]=cmc=plte.length;  plte.push(c);  if(plte.length>=300) break;  }
						ind[i]=cmc;
					}
				}
			}
			//console.log("make palette", Date.now()-time);  time = Date.now();
		}

		var cc=plte.length; //console.log("colors:",cc);
		if(cc<=256 && forbidPlte==false) {
			if(cc<= 2) depth=1;  else if(cc<= 4) depth=2;  else if(cc<=16) depth=4;  else depth=8;
			depth =  Math.max(depth, minBits);
		}

		for(var j=0; j<frms.length; j++)
		{
			var frm = frms[j], nx=frm.rect.x, ny=frm.rect.y, nw=frm.rect.width, nh=frm.rect.height;
			var cimg = frm.img, cimg32 = new Uint32Array(cimg.buffer);
			var bpl = 4*nw, bpp=4;
			if(cc<=256 && forbidPlte==false) {
				bpl = Math.ceil(depth*nw/8);
				var nimg = new Uint8Array(bpl*nh);
				var inj = inds[j];
				for(var y=0; y<nh; y++) {  var i=y*bpl, ii=y*nw;
					if     (depth==8) for(var x=0; x<nw; x++) nimg[i+(x)   ]   =  (inj[ii+x]             );
					else if(depth==4) for(var x=0; x<nw; x++) nimg[i+(x>>1)]  |=  (inj[ii+x]<<(4-(x&1)*4));
					else if(depth==2) for(var x=0; x<nw; x++) nimg[i+(x>>2)]  |=  (inj[ii+x]<<(6-(x&3)*2));
					else if(depth==1) for(var x=0; x<nw; x++) nimg[i+(x>>3)]  |=  (inj[ii+x]<<(7-(x&7)*1));
				}
				cimg=nimg;  ctype=3;  bpp=1;
			}
			else if(gotAlpha==false && frms.length==1) {	// some next "reduced" frames may contain alpha for blending
				var nimg = new Uint8Array(nw*nh*3), area=nw*nh;
				for(var i=0; i<area; i++) { var ti=i*3, qi=i*4;  nimg[ti]=cimg[qi];  nimg[ti+1]=cimg[qi+1];  nimg[ti+2]=cimg[qi+2];  }
				cimg=nimg;  ctype=2;  bpp=3;  bpl=3*nw;
			}
			frm.img=cimg;  frm.bpl=bpl;  frm.bpp=bpp;
		}
		//console.log("colors => palette indices", Date.now()-time);  time = Date.now();

		return {ctype:ctype, depth:depth, plte:plte, frames:frms  };
	}
	function framize(bufs,w,h,alwaysBlend,evenCrd,forbidPrev) {
		/*  DISPOSE
			- 0 : no change
			- 1 : clear to transparent
			- 2 : retstore to content before rendering (previous frame disposed)
			BLEND
			- 0 : replace
			- 1 : blend
		*/
		var frms = [];
		for(var j=0; j<bufs.length; j++) {
			var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
			var nimg;

			var nx=0, ny=0, nw=w, nh=h, blend=alwaysBlend?1:0;
			if(j!=0) {
				var tlim = (forbidPrev || alwaysBlend || j==1 || frms[j-2].dispose!=0)?1:2, tstp = 0, tarea = 1e9;
				for(var it=0; it<tlim; it++)
				{
					var pimg = new Uint8Array(bufs[j-1-it]), p32 = new Uint32Array(bufs[j-1-it]);
					var mix=w,miy=h,max=-1,may=-1;
					for(var y=0; y<h; y++) for(var x=0; x<w; x++) {
						var i = y*w+x;
						if(cimg32[i]!=p32[i]) {
							if(x<mix) mix=x;  if(x>max) max=x;
							if(y<miy) miy=y;  if(y>may) may=y;
						}
					}
					if(max==-1) mix=miy=max=may=0;
					if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
					var sarea = (max-mix+1)*(may-miy+1);
					if(sarea<tarea) {
						tarea = sarea;  tstp = it;
						nx = mix; ny = miy; nw = max-mix+1; nh = may-miy+1;
					}
				}

				// alwaysBlend: pokud zjistím, že blendit nelze, nastavím předchozímu snímku dispose=1. Zajistím, aby obsahoval můj obdélník.
				var pimg = new Uint8Array(bufs[j-1-tstp]);
				if(tstp==1) frms[j-1].dispose = 2;

				nimg = new Uint8Array(nw*nh*4);
				_copyTile(pimg,w,h, nimg,nw,nh, -nx,-ny, 0);

				blend =  _copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 3) ? 1 : 0;
				if(blend==1) _prepareDiff(cimg,w,h,nimg,{x:nx,y:ny,width:nw,height:nh});
				else         _copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, 0);
			}
			else nimg = cimg.slice(0);	// img may be rewritten further ... don't rewrite input

			frms.push({rect:{x:nx,y:ny,width:nw,height:nh}, img:nimg, blend:blend, dispose:0});
		}


		if(alwaysBlend) for(var j=0; j<frms.length; j++) {
			var frm = frms[j];  if(frm.blend==1) continue;
			var r0 = frm.rect, r1 = frms[j-1].rect
			var miX = Math.min(r0.x, r1.x), miY = Math.min(r0.y, r1.y);
			var maX = Math.max(r0.x+r0.width, r1.x+r1.width), maY = Math.max(r0.y+r0.height, r1.y+r1.height);
			var r = {x:miX, y:miY, width:maX-miX, height:maY-miY};

			frms[j-1].dispose = 1;
			if(j-1!=0)
			_updateFrame(bufs, w,h,frms, j-1,r, evenCrd);
			_updateFrame(bufs, w,h,frms, j  ,r, evenCrd);
		}
		var area = 0;
		if(bufs.length!=1) for(var i=0; i<frms.length; i++) {
			var frm = frms[i];
			area += frm.rect.width*frm.rect.height;
			//if(i==0 || frm.blend!=1) continue;
			//var ob = new Uint8Array(
			//console.log(frm.blend, frm.dispose, frm.rect);
		}
		//if(area!=0) console.log(area);
		return frms;
	}
	function _updateFrame(bufs, w,h, frms, i, r, evenCrd) {
		var U8 = Uint8Array, U32 = Uint32Array;
		var pimg = new U8(bufs[i-1]), pimg32 = new U32(bufs[i-1]), nimg = i+1<bufs.length ? new U8(bufs[i+1]):null;
		var cimg = new U8(bufs[i]), cimg32 = new U32(cimg.buffer);

		var mix=w,miy=h,max=-1,may=-1;
		for(var y=0; y<r.height; y++) for(var x=0; x<r.width; x++) {
			var cx = r.x+x, cy = r.y+y;
			var j = cy*w+cx, cc = cimg32[j];
			// no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.
			if(cc==0 || (frms[i-1].dispose==0 && pimg32[j]==cc && (nimg==null || nimg[j*4+3]!=0))/**/) {}
			else {
				if(cx<mix) mix=cx;  if(cx>max) max=cx;
				if(cy<miy) miy=cy;  if(cy>may) may=cy;
			}
		}
		if(max==-1) mix=miy=max=may=0;
		if(evenCrd) {  if((mix&1)==1)mix--;  if((miy&1)==1)miy--;  }
		r = {x:mix, y:miy, width:max-mix+1, height:may-miy+1};

		var fr = frms[i];  fr.rect = r;  fr.blend = 1;  fr.img = new Uint8Array(r.width*r.height*4);
		if(frms[i-1].dispose==0) {
			_copyTile(pimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
			_prepareDiff(cimg,w,h,fr.img,r);
		}
		else
			_copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 0);
	}
	function _prepareDiff(cimg, w,h, nimg, rec) {
		_copyTile(cimg,w,h, nimg,rec.width,rec.height, -rec.x,-rec.y, 2);
	}

	function _filterZero(img,h,bpp,bpl,data, filter, levelZero)
	{
		var fls = [], ftry=[0,1,2,3,4];
		if     (filter!=-1)             ftry=[filter];
		else if(h*bpl>500000 || bpp==1) ftry=[0];
		var opts;  if(levelZero) opts={level:0};


		var CMPR = (data.length>10e6 && window.UZIP!=null) ? window.UZIP : pako;

		var time = Date.now();
		for(var i=0; i<ftry.length; i++) {
			for(var y=0; y<h; y++) _filterLine(data, img, y, bpl, bpp, ftry[i]);
			//var nimg = new Uint8Array(data.length);
			//var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
			//var dfl = pako["deflate"](data), dl=dfl.length-4;
			//var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
			//console.log(crc, UZIP.adler(data,2,data.length-6));
			fls.push(CMPR["deflate"](data,opts));
		}

		var ti, tsize=1e9;
		for(var i=0; i<fls.length; i++) if(fls[i].length<tsize) {  ti=i;  tsize=fls[i].length;  }
		return fls[ti];
	}
	function _filterLine(data, img, y, bpl, bpp, type)
	{
		var i = y*bpl, di = i+y;
		data[di]=type;  di++;

		if(type==0) {
			if(bpl<500) for(var x=0; x<bpl; x++) data[di+x] = img[i+x];
			else data.set(new Uint8Array(img.buffer,i,bpl),di);
		}
		else if(type==1) {
			for(var x=  0; x<bpp; x++) data[di+x] =  img[i+x];
			for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]-img[i+x-bpp]+256)&255;
		}
		else if(y==0) {
			for(var x=  0; x<bpp; x++) data[di+x] = img[i+x];

			if(type==2) for(var x=bpp; x<bpl; x++) data[di+x] = img[i+x];
			if(type==3) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - (img[i+x-bpp]>>1) +256)&255;
			if(type==4) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - paeth(img[i+x-bpp], 0, 0) +256)&255;
		}
		else {
			if(type==2) { for(var x=  0; x<bpl; x++) data[di+x] = (img[i+x]+256 - img[i+x-bpl])&255;  }
			if(type==3) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - (img[i+x-bpl]>>1))&255;
						  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - ((img[i+x-bpl]+img[i+x-bpp])>>1))&255;  }
			if(type==4) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - paeth(0, img[i+x-bpl], 0))&255;
						  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - paeth(img[i+x-bpp], img[i+x-bpl], img[i+x-bpp-bpl]))&255;  }
		}
	}


	function quantize(abuf, ps)
	{
		var sb = new Uint8Array(abuf), tb = sb.slice(0), tb32 = new Uint32Array(tb.buffer);

		var KD = getKDtree(tb, ps);
		var root = KD[0], leafs = KD[1];

		var len=sb.length;

		var inds = new Uint8Array(len>>2), nd;
		if(sb.length<20e6)  // precise, but slow :(
			for(var i=0; i<len; i+=4) {
				var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);

				nd = getNearest(root, r, g, b, a);
				inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
			}
		else
			for(var i=0; i<len; i+=4) {
				var r=sb[i]*(1/255), g=sb[i+1]*(1/255), b=sb[i+2]*(1/255), a=sb[i+3]*(1/255);

				nd = root;  while(nd.left) nd = (planeDst(nd.est,r,g,b,a)<=0) ? nd.left : nd.right;
				inds[i>>2] = nd.ind;  tb32[i>>2] = nd.est.rgba;
			}
		return {  abuf:tb.buffer, inds:inds, plte:leafs  };
	}

	function getKDtree(nimg, ps, err) {
		if(err==null) err = 0.0001;
		var nimg32 = new Uint32Array(nimg.buffer);

		var root = {i0:0, i1:nimg.length, bst:null, est:null, tdst:0, left:null, right:null };  // basic statistic, extra statistic
		root.bst = stats(  nimg,root.i0, root.i1  );  root.est = estats( root.bst );
		var leafs = [root];

		while(leafs.length<ps)
		{
			var maxL = 0, mi=0;
			for(var i=0; i<leafs.length; i++) if(leafs[i].est.L > maxL) {  maxL=leafs[i].est.L;  mi=i;  }
			if(maxL<err) break;
			var node = leafs[mi];

			var s0 = splitPixels(nimg,nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
			var s0wrong = (node.i0>=s0 || node.i1<=s0);
			//console.log(maxL, leafs.length, mi);
			if(s0wrong) {  node.est.L=0;  continue;  }


			var ln = {i0:node.i0, i1:s0, bst:null, est:null, tdst:0, left:null, right:null };  ln.bst = stats( nimg, ln.i0, ln.i1 );
			ln.est = estats( ln.bst );
			var rn = {i0:s0, i1:node.i1, bst:null, est:null, tdst:0, left:null, right:null };  rn.bst = {R:[], m:[], N:node.bst.N-ln.bst.N};
			for(var i=0; i<16; i++) rn.bst.R[i] = node.bst.R[i]-ln.bst.R[i];
			for(var i=0; i< 4; i++) rn.bst.m[i] = node.bst.m[i]-ln.bst.m[i];
			rn.est = estats( rn.bst );

			node.left = ln;  node.right = rn;
			leafs[mi]=ln;  leafs.push(rn);
		}
		leafs.sort(function(a,b) {  return b.bst.N-a.bst.N;  });
		for(var i=0; i<leafs.length; i++) leafs[i].ind=i;
		return [root, leafs];
	}

	function getNearest(nd, r,g,b,a)
	{
		if(nd.left==null) {  nd.tdst = dist(nd.est.q,r,g,b,a);  return nd;  }
		var pd = planeDst(nd.est,r,g,b,a);

		var node0 = nd.left, node1 = nd.right;
		if(pd>0) {  node0=nd.right;  node1=nd.left;  }

		var ln = getNearest(node0, r,g,b,a);
		if(ln.tdst<=pd*pd) return ln;
		var rn = getNearest(node1, r,g,b,a);
		return rn.tdst<ln.tdst ? rn : ln;
	}
	function planeDst(est, r,g,b,a) {  var e = est.e;  return e[0]*r + e[1]*g + e[2]*b + e[3]*a - est.eMq;  }
	function dist    (q,   r,g,b,a) {  var d0=r-q[0], d1=g-q[1], d2=b-q[2], d3=a-q[3];  return d0*d0+d1*d1+d2*d2+d3*d3;  }

	function splitPixels(nimg, nimg32, i0, i1, e, eMq)
	{
		i1-=4;
		var shfs = 0;
		while(i0<i1)
		{
			while(vecDot(nimg, i0, e)<=eMq) i0+=4;
			while(vecDot(nimg, i1, e)> eMq) i1-=4;
			if(i0>=i1) break;

			var t = nimg32[i0>>2];  nimg32[i0>>2] = nimg32[i1>>2];  nimg32[i1>>2]=t;

			i0+=4;  i1-=4;
		}
		while(vecDot(nimg, i0, e)>eMq) i0-=4;
		return i0+4;
	}
	function vecDot(nimg, i, e)
	{
		return nimg[i]*e[0] + nimg[i+1]*e[1] + nimg[i+2]*e[2] + nimg[i+3]*e[3];
	}
	function stats(nimg, i0, i1){
		var R = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,0,0];
		var m = [0,0,0,0];
		var N = (i1-i0)>>2;
		for(var i=i0; i<i1; i+=4)
		{
			var r = nimg[i]*(1/255), g = nimg[i+1]*(1/255), b = nimg[i+2]*(1/255), a = nimg[i+3]*(1/255);
			//var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];
			m[0]+=r;  m[1]+=g;  m[2]+=b;  m[3]+=a;

			R[ 0] += r*r;  R[ 1] += r*g;  R[ 2] += r*b;  R[ 3] += r*a;
						   R[ 5] += g*g;  R[ 6] += g*b;  R[ 7] += g*a;
										  R[10] += b*b;  R[11] += b*a;
														 R[15] += a*a;
		}
		R[4]=R[1];  R[8]=R[2];  R[9]=R[6];  R[12]=R[3];  R[13]=R[7];  R[14]=R[11];

		return {R:R, m:m, N:N};
	}
	function estats(stats){
		var R = stats.R, m = stats.m, N = stats.N;

		// when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)
		var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = (N==0 ? 0 : 1/N);
		var Rj = [
			R[ 0] - m0*m0*iN,  R[ 1] - m0*m1*iN,  R[ 2] - m0*m2*iN,  R[ 3] - m0*m3*iN,
			R[ 4] - m1*m0*iN,  R[ 5] - m1*m1*iN,  R[ 6] - m1*m2*iN,  R[ 7] - m1*m3*iN,
			R[ 8] - m2*m0*iN,  R[ 9] - m2*m1*iN,  R[10] - m2*m2*iN,  R[11] - m2*m3*iN,
			R[12] - m3*m0*iN,  R[13] - m3*m1*iN,  R[14] - m3*m2*iN,  R[15] - m3*m3*iN
		];

		var A = Rj, M = M4;
		var b = [Math.random(),Math.random(),Math.random(),Math.random()], mi = 0, tmi = 0;

		if(N!=0)
		for(var i=0; i<16; i++) {
			b = M.multVec(A, b);  tmi = Math.sqrt(M.dot(b,b));  b = M.sml(1/tmi,  b);
			if(i!=0 && Math.abs(tmi-mi)<1e-9) break;  mi = tmi;
		}
		//b = [0,0,1,0];  mi=N;
		var q = [m0*iN, m1*iN, m2*iN, m3*iN];
		var eMq255 = M.dot(M.sml(255,q),b);

		return {  Cov:Rj, q:q, e:b, L:mi,  eMq255:eMq255, eMq : M.dot(b,q),
					rgba: (((Math.round(255*q[3])<<24) | (Math.round(255*q[2])<<16) |  (Math.round(255*q[1])<<8) | (Math.round(255*q[0])<<0))>>>0)  };
	}
	var M4 = {
		multVec : function(m,v) {
				return [
					m[ 0]*v[0] + m[ 1]*v[1] + m[ 2]*v[2] + m[ 3]*v[3],
					m[ 4]*v[0] + m[ 5]*v[1] + m[ 6]*v[2] + m[ 7]*v[3],
					m[ 8]*v[0] + m[ 9]*v[1] + m[10]*v[2] + m[11]*v[3],
					m[12]*v[0] + m[13]*v[1] + m[14]*v[2] + m[15]*v[3]
				];
		},
		dot : function(x,y) {  return  x[0]*y[0]+x[1]*y[1]+x[2]*y[2]+x[3]*y[3];  },
		sml : function(a,y) {  return [a*y[0],a*y[1],a*y[2],a*y[3]];  }
	}

	function concatRGBA(bufs) {
		var tlen = 0;
		for(var i=0; i<bufs.length; i++) tlen += bufs[i].byteLength;
		var nimg = new Uint8Array(tlen), noff=0;
		for(var i=0; i<bufs.length; i++) {
			var img = new Uint8Array(bufs[i]), il = img.length;
			for(var j=0; j<il; j+=4) {
				var r=img[j], g=img[j+1], b=img[j+2], a = img[j+3];
				if(a==0) r=g=b=0;
				nimg[noff+j]=r;  nimg[noff+j+1]=g;  nimg[noff+j+2]=b;  nimg[noff+j+3]=a;  }
			noff += il;
		}
		return nimg.buffer;
	}

	UPNG.encode = encode;
	UPNG.encodeLL = encodeLL;
	UPNG.encode.compress = compress;
	UPNG.encode.dither = dither;

	UPNG.quantize = quantize;
	UPNG.quantize.getKDtree=getKDtree;
	UPNG.quantize.getNearest=getNearest;
})();