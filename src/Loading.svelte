<script>
    const text = "loading";
</script>

<style>
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
        overflow: hidden;
        color: white;
        user-select: none;
        font-size: 2rem;
        font-weight: normal;
        background: transparent;
    }

    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        animation: pulse 1500ms infinite;
    }

    @keyframes pulse {
        0% {
            transform: rotate(2deg);
        }
        5% {
            transform: rotate(-2deg);
        }
        10% {
            transform: rotate(2deg);
        }
        15% {
            transform: rotate(-2deg);
        }
        20% {
            transform: rotate(2deg);
        }
        25% {
            transform: rotate(-2deg);
        }
        30% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>

<div class="loading"><span class="title">{text}</span></div>
