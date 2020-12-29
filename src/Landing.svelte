<script>
import { onMount } from "svelte";

    import { fade } from "svelte/transition";

    export let text = "seven spaces";
    export let scrollY;

    $: visible = scrollY < 50;

    function jitter(node) {
        let alreadyCalled = false;
        let copies = [];
        function doJitter() {
            if (alreadyCalled) return;
            alreadyCalled = true;
            const title = node.firstChild;
            const nCopies = 40;
            const t = 40; // time per copy
            const reveal = 500; // t
            const hideEle = (node) => (node.style.visibility = "hidden");
            const showEle = (node) => (node.style.visibility = "visible");
            const clearCopies = () => {
                copies.forEach((copy) => copy.remove());
                copies.length = 0;
                title.style.opacity = 1;
            };

            title.style.opacity = 0;
            for (let i = 0; i < nCopies; i++) {
                const copy = document.createElement("p");
                copy.textContent = text;
                let top = Math.random() * window.innerHeight + "px";
                let left = Math.random() * window.innerWidth + "px";
                copy.style.position = "absolute";
                copy.style.top = top;
                copy.style.left = left;
                copy.style.color = "#fff";
                setTimeout(() => {
                    node.appendChild(copy);
                    copies.push(copy);
                    setTimeout(() => hideEle(copy), t);
                }, t * i);
            }
            setTimeout(() => copies.forEach(showEle), nCopies * t + reveal);
            setTimeout(() => clearCopies(), nCopies * t + reveal + reveal);
        }
        setTimeout(() => doJitter(), 750);
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

    .chevron-icon {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
    }
</style>

{#if visible}
    <div transition:fade class="landing" use:jitter><span class="title">{text}</span><img width="40px" height="auto" class="chevron-icon" src="/img/chevron_down.svg" alt="down arrow" /></div>
{/if}
