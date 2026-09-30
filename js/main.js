/* =========================================================
   BY FOSTER
   Hero network animation
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const network =
        document.querySelector(".hero-network");

    if (!network) {
        return;
    }


    const nodes =
        Array.from(
            network.querySelectorAll(
                ".network-node"
            )
        );


    const paths =
        Array.from(
            network.querySelectorAll(
                ".network-path"
            )
        );


    const core =
        network.querySelector(
            ".network-core"
        );


    if (!nodes.length) {
        return;
    }


    /*
    ---------------------------------------------------------
    CONFIGURACIÓN
    ---------------------------------------------------------
    */

    const ACTIVE_TIME = 4600;

    let currentIndex = 0;

    let loopTimer = null;


    /*
    ---------------------------------------------------------
    ACTIVAR NODO
    ---------------------------------------------------------
    */

    function activateNode(index) {

        currentIndex =
            index % nodes.length;


        const activeNode =
            nodes[currentIndex];


        const nodeName =
            activeNode.dataset.node;


        /*
        quitar estado anterior
        */

        nodes.forEach((node) => {
            node.classList.remove(
                "is-active"
            );
        });


        paths.forEach((path) => {
            path.classList.remove(
                "is-active"
            );
        });


        /*
        activar nueva tarjeta
        */

        activeNode.classList.add(
            "is-active"
        );


        /*
        activar línea asociada
        */

        const activePath =
            paths.find(
                (path) =>
                    path.dataset.link ===
                    nodeName
            );


        if (activePath) {

            activePath.classList.add(
                "is-active"
            );

        }


        /*
        hacer reaccionar el núcleo
        */

        if (core) {

            core.classList.remove(
                "is-reacting"
            );


            /*
            Forzamos reflow para
            reiniciar la animación.
            */

            void core.offsetWidth;


            core.classList.add(
                "is-reacting"
            );

        }

    }


    /*
    ---------------------------------------------------------
    SIGUIENTE NODO
    ---------------------------------------------------------
    */

    function nextNode() {

        const nextIndex =
            (currentIndex + 1) %
            nodes.length;


        activateNode(
            nextIndex
        );

    }


    /*
    ---------------------------------------------------------
    LOOP
    ---------------------------------------------------------
    */

    function startLoop() {

        stopLoop();


        loopTimer =
            window.setInterval(
                nextNode,
                ACTIVE_TIME
            );

    }


    function stopLoop() {

        if (!loopTimer) {
            return;
        }


        window.clearInterval(
            loopTimer
        );


        loopTimer = null;

    }


    /*
    ---------------------------------------------------------
    INTERACCIÓN MANUAL
    ---------------------------------------------------------
    El usuario puede pasar el mouse
    sobre una tarjeta para activarla.
    ---------------------------------------------------------
    */

    nodes.forEach(
        (node, index) => {

            node.addEventListener(
                "mouseenter",
                () => {

                    stopLoop();

                    activateNode(
                        index
                    );

                }
            );


            node.addEventListener(
                "mouseleave",
                () => {

                    startLoop();

                }
            );

        }
    );


    /*
    ---------------------------------------------------------
    PAUSAR CUANDO LA PESTAÑA NO ESTÁ VISIBLE
    ---------------------------------------------------------
    */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                stopLoop();

            } else {

                startLoop();

            }

        }
    );


    /*
    ---------------------------------------------------------
    INICIO
    ---------------------------------------------------------
    */

    activateNode(0);

    startLoop();

});
