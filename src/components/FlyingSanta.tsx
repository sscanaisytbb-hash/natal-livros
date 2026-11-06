import React from 'react';

export const FlyingSanta: React.FC = () => {
  return (
    <div id="santa-sky" aria-hidden="true">
      <div className="santa-flight">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 205" focusable="false">
          <defs>
            <linearGradient id="santa-red" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#e34843" />
              <stop offset="1" stopColor="#8d1724" />
            </linearGradient>
            <linearGradient id="santa-gold" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#ffe6a1" />
              <stop offset="1" stopColor="#bd842e" />
            </linearGradient>
            <g id="santa-reindeer" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 91 10 108 1 103M43 94 51 112 64 108" fill="none" stroke="#63402c" strokeWidth="7" />
              <path d="M18 64 7 54 4 60 14 72" fill="#bc8150" />
              <ellipse cx="35" cy="78" rx="29" ry="17" fill="#ab7044" />
              <path d="M45 73 57 45 70 40 72 61 59 84" fill="#bd8753" />
              <path d="M55 44 43 32 48 30 62 37M69 40 76 28 82 31 77 43" fill="#dca56a" />
              <path d="M60 36 55 18 45 11M55 22 42 23M55 18 57 7M72 35 77 17 89 9M77 20 90 22M77 17 74 6" fill="none" stroke="#e9ca8c" strokeWidth="3" />
              <path d="M60 36Q79 31 84 44L94 48Q100 53 92 58L74 57 62 52" fill="#c7925c" />
              <path d="M82 50 92 50 93 56 83 56" fill="#e1b782" />
              <circle cx="78" cy="43" r="2.3" fill="#241b19" />
              <circle cx="78.7" cy="42.5" r="0.7" fill="#fff" />
              <ellipse cx="96" cy="51" rx="4" ry="3.3" fill="#641a22" />
              <path d="M60 59 71 63M24 63 28 94" fill="none" stroke="#a41d2c" strokeWidth="5" />
              <circle cx="66" cy="65" r="3" fill="#f4cf72" />
              <path d="M21 87 12 98 22 112M49 87 65 93 76 84" fill="none" stroke="#c18a54" strokeWidth="7" />
              <path d="M20 111 26 112M75 84 80 82" stroke="#3c2b24" strokeWidth="5" />
            </g>
          </defs>

          {/* Rênas ligando ao trenó */}
          <path d="M158 119Q263 155 320 93T535 70M160 122Q278 165 326 97T535 74" fill="none" stroke="#d8b56d" strokeWidth="1.5" opacity="0.8" />
          <g transform="translate(237 44)"><g className="santa-deer"><use href="#santa-reindeer" /></g></g>
          <g transform="translate(344 26)"><g className="santa-deer santa-deer-second"><use href="#santa-reindeer" /></g></g>
          <g transform="translate(451 9)"><g className="santa-deer santa-deer-third"><use href="#santa-reindeer" /><circle cx="96" cy="51" r="4.3" fill="#ef554c" /></g></g>

          {/* Trenó e Papai Noel */}
          <g className="santa-sleigh" strokeLinecap="round" strokeLinejoin="round">
            <path d="M35 121Q10 94 32 72L29 61 47 56 57 68Q81 78 83 119Z" fill="#aa783d" stroke="#d3a963" strokeWidth="2" />
            <path d="M29 67 56 69" stroke="#f2d289" strokeWidth="3" />
            <g transform="rotate(-12 69 108)">
              <rect x="47" y="85" width="41" height="38" rx="3" fill="#21654c" stroke="#88aa73" strokeWidth="1.5" />
              <path d="M66 85V123M47 99H88" stroke="#f2ca77" strokeWidth="5" />
              <path d="M66 85Q48 71 53 84L66 87Q83 68 80 83Z" fill="none" stroke="#f2ca77" strokeWidth="3" />
            </g>
            <g transform="rotate(9 91 112)">
              <rect x="76" y="97" width="34" height="30" rx="2" fill="#cd453c" />
              <path d="M92 97V127M76 106H110" stroke="#f7d591" strokeWidth="4" />
              <path d="M92 97Q77 85 80 95L92 99Q105 84 105 95Z" fill="none" stroke="#f7d591" strokeWidth="2.5" />
            </g>

            {/* Papai Noel */}
            <path d="M106 91Q126 85 141 97L153 127 99 131Z" fill="url(#santa-red)" stroke="#7d2030" strokeWidth="2" />
            <path d="M103 118 148 118" stroke="#33272b" strokeWidth="7" />
            <rect x="121" y="114" width="10" height="9" rx="1" fill="none" stroke="#e8bf65" strokeWidth="2.5" />
            <g className="santa-wave">
              <path d="M136 101Q153 94 157 77" fill="none" stroke="#bd2632" strokeWidth="15" />
              <path d="M151 79 163 82" stroke="#fff0d8" strokeWidth="8" />
              <path d="M154 76 151 66Q150 61 154 61L158 68 158 58Q158 53 162 55L164 65 168 58Q171 55 173 59L169 70Q168 77 161 78Z" fill="#fff4e1" />
            </g>
            <ellipse cx="124" cy="72" rx="20" ry="21" fill="#f4c2a0" />
            <path d="M104 73Q104 104 127 108Q146 94 143 75L135 81 126 80 116 82Z" fill="#fff1d8" />
            <path d="M119 84Q126 89 132 83" fill="none" stroke="#ac6354" strokeWidth="2" />
            <ellipse cx="125" cy="77" rx="5" ry="4" fill="#eaa587" />
            <path d="M111 71Q114 68 117 71M131 71Q134 68 137 71" fill="none" stroke="#3d292a" strokeWidth="2" />
            <ellipse cx="126" cy="73" rx="4" ry="3" fill="#cf3b3a" />
            <path d="M104 64Q117 48 139 56L143 65Q125 56 107 65Z" fill="#fff5e4" />
            <path d="M111 58Q126 31 143 38Q177 50 179 97L167 96Q162 57 141 50Q130 46 117 60Z" fill="url(#santa-red)" stroke="#7d2030" strokeWidth="1.5" />
            <circle cx="178" cy="98" r="9" fill="#fff8ee" />
            <path d="M38 126Q59 133 97 137T167 138Q197 134 205 119Q208 107 202 98Q195 91 185 91Q170 94 167 110Q166 122 174 128T194 130" fill="none" stroke="url(#santa-gold)" strokeWidth="6" />
            <path d="M58 139 49 169 139" fill="none" stroke="#e8c476" strokeWidth="2" />
            <path d="m77 144-5 22m91-23 8 20M38 168H179Q208 168 214 148" fill="none" stroke="url(#santa-gold)" strokeWidth="5" />
            <path d="m112 136 3 5 6 1-4 4 1 6-6-3-5 3 1-6-4-4 6-1Z" fill="#f7d78a" />
          </g>
          <g fill="#e6bf70" opacity="0.7">
            <circle cx="15" cy="160" r="2" />
            <circle cx="35" cy="182" r="1.5" />
            <path d="m8 130 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
          </g>
        </svg>
      </div>
    </div>
  );
};
