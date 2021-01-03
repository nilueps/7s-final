

<style>

    .subsection {
        /* height: 90vh; */
        margin: 15vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .about-7s {
        margin: 0 20vh;
    }

    h1 {
        font-size: 1.85vw;
        margin-bottom: 2vw;
    }

    h2 {
        text-align: center;
        font-size: 1.6vw;
        margin-bottom: 2vw;
    }
    p {
        font-size: 1vw;
        margin-bottom: 0.7vw;
    }
    table {
        font-size: 0.9vw;
    }
    tr {
        height: 1vw;
    }
    .credits table {
        margin: 0 auto;
        text-align: left;
    }

    .credits td {
        font-style: italic;
    }

    .credcat {
        font-style: bold;
        text-align: right;
    }

    div.subsection.materials > p {
        margin: 0.75vw 20vw;
        text-align: left;
    }

    .materials table {
        margin-top: 1vw;
        width: 75vw;
        text-align: left;
    }

    .materials thead {
        font-size: 1vw;
        /* text-align: center; */
        background-color: rgb(29, 29, 29);
    }
    .materials th {
        padding: 0.5vw 1vw;
    }
    .materials td {
        padding: 0.8vw 1vw;
        /* text-align: center; */
        background-color: rgb(14, 14, 14);
    }
    .link {
        height: 0.7vw;
        width: auto;
    }

    @media screen and (max-height: 800px) {
        .materials table {
            margin: 0;
        }
    }
</style>

    <div class="subsection about-7s">
        <h1>about seven spaces</h1>
        <p>Seven Spaces is a multimedia album for the web.</p>
        <p>The audio can be purchased or streamed at Bandcamp.</p>
    </div>
    <div class="subsection credits">
        <h2>credits</h2>

        <table>
            <tr>
                <th class="credcat">VISUALS</th>
                <td style="width: 15vw" rowspan="32" />
                <th>
                    <a
                        href="https://philipmeyer.cargo.site/"
                        rel="noopener"
                        target="_blank">Philip Meyer</a>
                </th>
            </tr>
            <tr>
                <td rowspan="15" />
                <td>206/754</td>
            </tr>
            <tr>
                <td>802/Red/B</td>
            </tr>
            <tr>
                <td>fork razor</td>
            </tr>
            <tr>
                <td>4435, 10, upper</td>
            </tr>
            <tr>
                <td>ritter, gabo</td>
            </tr>
            <tr>
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th>
                    <a
                        href="https://vimeo.com/user17028823"
                        rel="noopener"
                        target="_blank">Ariel Fisher</a>
                </th>
            </tr>
            <tr>
                <td>nd vibra</td>
            </tr>
            <tr>
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th>
                    <a
                        href="https://cprinz.co/"
                        rel="noopener"
                        target="_blank">Sarah Prinz</a>
                </th>
            </tr>
            <tr>
                <td>memory</td>
            </tr>
            <tr>
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th class="credcat">MUSIC</th>
                <th>Philip Meyer</th>
            </tr>
            <tr>
                <td rowspan="3" />
                <th>Jason Adams</th>
            </tr>
            <tr>
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th class="credcat">VOCALS</th>
                <th>Clara Tissot</th>
            </tr>
            <tr>
                <td rowspan="3" />
                <td>nd vibra</td>
            </tr>
            <tr>
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th class="credcat">MASTERING</th>
                <th>Jeff Swearingen</th>
            </tr>
            <tr>
                <td rowspan="2" />
                <td rowspan="2" />
            </tr>
            <tr />
            <tr>
                <th class="credcat">WEBSITE</th>
                <th>
                    <a href="mailto:ncl.adama@gmail.com">Nico Adama, design</a>
                </th>
            </tr>
            <tr>
                <td rowspan="3" />
                <th>
                    <a
                        href="http://vincentpapineau.com"
                        rel="noopener"
                        target="_blank">Vincent Papineau, design</a>
                </th>
            </tr>
            <tr>
                <th>
                    <a
                        href="https://nilueps.net"
                        rel="noopener"
                        target="_blank">Nicolas Epstein, code</a>
                </th>
                <td rowspan="2" />
            </tr>
            <tr />
        </table>
    </div>

    <div class="subsection materials">
        <h2>meta materials</h2>
        <p>
            This work’s content is sound and image and also executable software
            and command data which were used to generate the sounds and images.
            We have published as much of these materials as we can, practically
            and legally, and we hope that others will use them in their work. If
            you do, please include attribution.
        </p>
        <table>
            <thead>
                <tr>
                    <th>item</th>
                    <th style="width: 20vw;">comment</th>
                    <th>used in</th>
                    <th>environment/format</th>
                    <th>source</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="2">p5.js source code and image material</td>
                    <td rowspan="4" />
                    <td>206/754</td>
                    <td rowspan="2">
                        <a
                            href="https://p5js.org/"
                            rel="noopener"
                            target="_blank">p5.js</a>
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/berg-intro-visual"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>4435, 10, upper</td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/covd-visual"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>3d model animator/manipulator</td>
                    <td>
                        nd vibra; fork razor; ritter, gabo; 802/Red/B; memory
                    </td>
                    <td rowspan="4">
                        <a
                            href="https://cycling74.com/"
                            rel="noopener"
                            target="_blank">Max</a>
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/3d-scan-trans"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        data source used for modulation in 3d model animator and
                        elsewhere
                    </td>
                    <td>
                        fork razor; ritter, gabo; 802/Red/B; 4435, 10, upper; nd
                        vibra
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/bfg-lfo"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>Max patch for generating audio descriptor data</td>
                    <td>
                        Implementation of IRCAM’s MuBu object. generates a JSON
                        file that reports the sonic characteristics (e.g.
                        “loudness”) of an audio file at regular (e.g. 16 ms)
                        intervals. Used to generate data that is used to allow
                        for audio-reactivity of graphics in P5.js and Max
                    </td>
                    <td>
                        fork razor; ritter, gabo; 802/Red/B; 4435, 10, upper
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/time-series-audio-data"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>

                <tr>
                    <td>
                        2d video and still image manipulation, mixing, editing,
                        and arrangement patches for max
                    </td>
                    <td />
                    <td>fork razor; ritter, gabo; 802/Red/B</td>
                    <td />
                </tr>
                <tr>
                    <td>audio files</td>
                    <td>stems</td>
                    <td>all</td>
                    <td>WAV file</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/zbws4ilvuze535g/AAD7yG9ahRqH9yWC7XHO_Qbda?dl=0"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>

                <tr>
                    <td>still images</td>
                    <td>source images</td>
                    <td>802/Red/B</td>
                    <td>PNG</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/nz6umskhhyxcrqj/AADR3VAZRhebC-vm9xlirC5qa?dl=0"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        instrument presets, sessions, and configuration data
                    </td>
                    <td>
                        session files for ableton live, plugin instrument
                        presets, MIDI sysex configuration data for hardware
                        machines
                    </td>
                    <td>all</td>
                    <td>various</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/q7wg1i6rg0uqlyw/AABLSqwewGXfsbd0CtV01FCza?dl=0"
                            rel="noopener"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="subsection thanks">
        <h2>acknowledgments</h2>
        <div style="text-align: left">
            <p>
                Many, many people contributed to the production of this work
                (some knowingly, some not)
            </p>
            <p>
                Sincere thanks to all these people for their support, knowledge,
                and guidance:
            </p>
            <br />
            <p>Clara Tissot</p>
            <p>Jason Adams</p>
            <p>Alice Scope</p>
            <p>Ariel Fisher</p>
            <p>Lee Kawasaki</p>
            <p>
                <a href="https://p5js.org/" rel="noopener" target="_blank">the
                    P5.js Community</a>
            </p>
            <p>
                <a
                    href="https://processingfoundation.org/"
                    rel="noopener"
                    target="_blank">The Processing Foundation</a>
            </p>
            <p>
                <a
                    href="https://www.google.com/search?q=amazing+max+stuff&oq=amazing+max+stuff&aqs=chrome..69i57.1746j0j7&sourceid=chrome&ie=UTF-8"
                    rel="noopener"
                    target="_blank">Federico Foderaro / Amazing Max Stuff</a>:
                training, inspiration, and support on Jitter and OpenGL in Max
            </p>
            <p>
                <a
                    href="https://thecodingtrain.com/"
                    rel="noopener"
                    target="_blank">Daniel Schiffman / The Coding Train:</a>:
                training and inspiration in Processing and P5, conceptual
                contributions
            </p>
            <p>
                Max/MSP creators and educators: Matt Wright, Italo Lombardo,
                Gregory Taylor, Andrew Benson, Sam Tarakajian, Manuel Polletti
            </p>
        </div>
    </div>
