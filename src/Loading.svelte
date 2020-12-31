<script>
    import { fade } from "svelte/transition";
    const text = "loading";
</script>

<style>
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100.1vh;
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
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        animation: pulse 1800ms infinite;
    }

    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) rotate(2deg);
        }
        5% {
            transform: translate(-50%, -50%) rotate(-2deg);
        }
        10% {
            transform: translate(-50%, -50%) rotate(2deg);
        }
        15% {
            transform: translate(-50%, -50%) rotate(-2deg);
        }
        20% {
            transform: translate(-50%, -50%) rotate(2deg);
        }
        25% {
            transform: translate(-50%, -50%) rotate(-2deg);
        }
        30% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        height: 400vh;
    }

    .flex-container {
        position: absolute;
        top: 0;
        left: 0;
        height: 100.1vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .spinner {
        width: 40px;
        height: 40px;
        background-color: rgb(255, 255, 255);

        margin: 100px auto;
        -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
        animation: sk-rotateplane 1.2s infinite ease-in-out;
    }

    @-webkit-keyframes sk-rotateplane {
        0% {
            -webkit-transform: perspective(120px);
        }
        50% {
            -webkit-transform: perspective(120px) rotateY(180deg);
        }
        100% {
            -webkit-transform: perspective(120px) rotateY(180deg)
                rotateX(180deg);
        }
    }

    @keyframes sk-rotateplane {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        50% {
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            -webkit-transform: perspective(120px) rotateX(-180.1deg)
                rotateY(0deg);
        }
        100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            -webkit-transform: perspective(120px) rotateX(-180deg)
                rotateY(-179.9deg);
        }
    }
</style>

<div transition:fade class="flex-container">
    <img
        width="100%"
        height="auto"
        src="img/layers/1_long.jpg"
        alt="placeholder" />
    <div class="spinner" />
</div>

<!-- <div transition:fade class="loading"><span class="title">{text}</span></div> -->
