<script>
  export let text = "";
</script>

<style>
  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .placeholder::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      -45deg,
      white,
      white 0.6rem,
      grey 0.6rem,
      grey 1.2rem
    );
    border: 0.6rem solid grey;
    border-radius: 1rem;
    opacity: 0.5;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    background: white;
    border: 0.25rem solid;
  }
</style>

<div class="placeholder"><span class="content">{text}</span></div>
<!-- <svg {style} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
  <text x="50%" y="50%" style="font-size: 2rem ; fill: {textColor};">
    {text}
  </text>
</svg>
 -->
