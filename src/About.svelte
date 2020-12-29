<style>
    .about {
        height: 400vh;
        text-align: center;
        padding: 10vh 10vw;
        padding-top: 50vh;
        background: black;
    }

    .subsection {
        margin: 10rem auto;
    }

    .about-7s {
        margin: 0 20vh;
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    tr {
        height: 2rem;
        min-height: 2rem;
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

    table {
        font-size: 1rem;
    }
    a {
        color: #55ffc4;
        text-decoration: none;
    }
    a:visited {
        color: #48b68d;
    }
    .sources thead {
        font-size: 1.5rem;
        text-align: center;
        background-color: rgb(48, 48, 48);
    }
    .sources th {
        padding: 0.5rem 1rem;
    }
    .sources td {
        padding: 0.5rem 0.5rem;
        text-align: center;
        background-color: rgb(49, 49, 49);
    }
    .link {
        height: 1rem;
        width: auto;
    }
</style>

<section class="about">
    <div class="subsection about-7s">
        <h2>about seven spaces</h2>
        <p>Seven Spaces is a multimedia album for the web.</p>
        <p>The audio can be purchased or streamed at Bandcamp.</p>
    </div>

    <div class="subsection credits">
        <h2>credits</h2>

        <table>
            <tr>
                <th class="credcat">VISUALS</th>
                <td style="width: 15rem" rowspan="30" />
                <th>
                    <a
                        href="https://philipmeyer.cargo.site/"
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
                    <a href="https://cprinz.co/" target="_blank">Sarah Prinz</a>
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
                <th>Nico Adama</th>
            </tr>
            <tr>
                <td rowspan="2" />
                <th>
                    <a href="https://nilueps.net" target="_blank">Nicolas
                        Epstein</a>
                </th>
            </tr>
            <tr>
                <th>Vincent Papineau</th>
            </tr>
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
        <table class="sources">
            <thead>
                <tr>
                    <th>item</th>
                    <th>comment</th>
                    <th>used in</th>
                    <th>environment/format</th>
                    <th>link</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>p5.js source code and image material</td>
                    <td rowspan="3" />
                    <td>206/754</td>
                    <td>
                        <a href="https://p5js.org/" target="_blank">p5.js</a>
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/berg-intro-visual"
                            target="_blank">https://github.com/pdmeyer/berg-intro-visual</a>
                    </td>
                </tr>
                <tr>
                    <td>3d model animator/manipulator</td>
                    <td>
                        nd vibra; fork razor; ritter, gabo; 802/Red/B; memory
                    </td>
                    <td rowspan="3">
                        <a href="https://cycling74.com/" target="_blank">Max</a>
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/3d-scan-trans"
                            target="_blank">https://github.com/pdmeyer/3d-scan-trans</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        data source used for modulation in 3d model animator and
                        elsewhere
                    </td>
                    <td>
                        data source used for modulation in 3d model animator and
                        elsewhere
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/bfg-lfo"
                            target="_blank">https://github.com/pdmeyer/bfg-lfo</a>
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
                            target="_blank">https://github.com/pdmeyer/time-series-audio-data</a>
                    </td>
                </tr>
                <tr>
                    <td>p5.js source code and image material</td>
                    <td rowspan="3" />
                    <td>4435, 10, upper</td>
                    <td>
                        <a href="https://p5js.org/" target="_blank">p5.js</a>
                    </td>
                    <td>
                        <a
                            href="https://github.com/pdmeyer/covd-visual"
                            target="_blank">https://github.com/pdmeyer/covd-visual</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        2d video and still image manipulation, mixing, editing,
                        and arrangement patches for max
                    </td>
                    <td>fork razor; ritter, gabo; 802/Red/B</td>
                    <td>
                        <a href="https://cycling74.com/" target="_blank">Max</a>
                    </td>
                    <td rowspan="2" />
                </tr>
                <tr>
                    <td>texture generator</td>
                    <td>802/Red/B</td>
                    <td>Processing</td>
                </tr>
                <tr>
                    <td rowspan="7">audio files</td>
                    <td rowspan="7">stems</td>
                    <td>206/754</td>
                    <td rowspan="7">WAV file</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/hyqded6sb082pwl/AABKtiTZpJUN79fq1Rtn-XGia?dl=0"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>nd vibra</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/099mk2ppb6dquhi/AABd9F3pnFVOLFmJkXz4GEIaa?dl=0"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>802/Red/B</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/vc4bfcase6hjw0t/AABs5tcDrhbE_qx2b8zIAzGJa?dl=0"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>fork razor</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/8app8fjplmvl6zp/AAC832CHujhX-iJ_guKrx2DYa?dl=0"
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
                            href="https://www.dropbox.com/sh/13f91hpjn4pnqmc/AAChZyoqPrD4kL6-PyKmW9W2a?dl=0"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>ritter, gabo</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/j9px1olweuyxtop/AADmHLXityuW5QhSDO84lAPKa?dl=0"
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td>memory</td>
                    <td>
                        <a
                            href="https://www.dropbox.com/sh/n6bdk1vkjakks16/AAB1Vjj5cRs8KhHI4gwlnvQLa?dl=0"
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
                            target="_blank"><img
                                class="link"
                                src="/img/link.svg"
                                alt="link symbol" /></a>
                    </td>
                </tr>
                <tr>
                    <td rowspan="7">
                        instrument presets, sessions, and configuration data
                    </td>
                    <td rowspan="7">
                        session files for ableton live, plugin instrument
                        presets, MIDI sysex configuration data for hardware
                        machines
                    </td>
                    <td>206/754</td>
                    <td rowspan="7">various</td>
                    <td rowspan="7" />
                </tr>
                <tr>
                    <td>nd vibra</td>
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
                    <td>memory</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="subsection thanks">
        <h2>acknowledgments</h2>
        <div style="text-align: center">
            <p>
                Many, many people contributed to the production of this work
                (some knowingly, some not)
            </p>
            <p>
                Sincere thanks to all these people for their support, knowledge,
                and guidance:
            </p>
            <br>
            <p>Clara Tissot</p>
            <p>Jason Adams</p>
            <p>Alice Scope</p>
            <p>Ariel Fisher</p>
            <p>Lee Kawasaki</p>
            <p>
                <a href="https://p5js.org/" target="_blank">the P5.js Community</a>
            </p>
            <p>
                <a
                    href="https://processingfoundation.org/"
                    target="_blank">The Processing Foundation</a>
            </p>
            <p>
                <a
                    href="https://www.google.com/search?q=amazing+max+stuff&oq=amazing+max+stuff&aqs=chrome..69i57.1746j0j7&sourceid=chrome&ie=UTF-8"
                    target="_blank">Federico Foderaro / Amazing Max Stuff</a>:
                training, inspiration, and support on Jitter and OpenGL in Max
            </p>
            <p>
                <a href="https://thecodingtrain.com/" target="_blank">Daniel
                    Schiffman / The Coding Train:</a>: training and inspiration
                in Processing and P5, conceptual contributions
            </p>
            <p>
                Max/MSP creators and educators: Matt Wright, Italo Lombardo,
                Gregory Taylor, Andrew Benson, Sam Tarakajian, Manuel Polletti
            </p>
        </div>
    </div>
</section>
