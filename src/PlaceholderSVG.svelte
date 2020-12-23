<script>
  export let text = ""
  export let stroke = "lightgrey"
  export let textColor = "black"
  export let fill = "none"
  export let style = ""
</script>

<svg {style} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" {fill} />
  <defs>
    <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M 8 0 L 0 0 0 8" fill="none" {stroke} stroke-width="0.5" />
    </pattern>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <rect width="80" height="80" fill="url(#smallGrid)" />
      <path d="M 80 0 L 0 0 0 80" fill="none" {stroke} stroke-width="1" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)" />
  <text x="50%" y="50%" style="font: 12px monospace; fill: {textColor}">
    {text}
  </text>
</svg>
