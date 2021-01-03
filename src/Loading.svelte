<script>
    import { fade } from "svelte/transition";
</script>

<style>
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

<div class="flex-container">
    <picture>
        <source type="image/webp" srcset="img/layers/1_long.webp" />
        <source type="image/jpeg" srcset="img/layers/1_long.jpg" />
        <img
            width="100%"
            height="auto"
            src="img/layers/1_long.jpg"
            alt="fragment" />
    </picture>

    <div transition:fade class="spinner" />
</div>
