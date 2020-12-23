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
        animation: pulse 2s infinite;
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
    }
</style>

<div class="loading"><span class="title">{text}</span></div>
