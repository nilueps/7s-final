<script>
    const text = "loading";
    function pulse(node) {
        
    }
</script>

<style>
    .landing {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
        overflow: hidden;
        color: white;
        user-select: none;
        font-size: 1.25rem;
        font-weight: normal;
        background: transparent;
    }

    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
</style>

<div class="landing" use:pulse><span class="title">{text}</span></div>
