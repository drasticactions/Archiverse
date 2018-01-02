import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

export class FAQ extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div style={{fontSize: "large"}}>
            <div className="panel-group" id="faqAccordion">
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question0">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{cursor: "pointer"}} className="ing">Is this a complete archive of Miiverse?</span>
                        </h4>
                    </div>
                    <div id="question0" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>Short Answer: No</p>
                            <p>Long Answer: Archiverse represents everything Archive Team grabbed during the Miiverse shutdown. While we attempted to download and store as much as possible, given the amount of time to do the archive and the crawling we had to do to get what we ended up with, there is no way to know precisely how much we missed. From Miiverse administrators deleting users and posts, users who hid their profiles, new communities created after the shutdown notice went out, to stability issues with Miiverse itself, many things would stop a complete archive of the site. </p>
                            <p>Of course, Nintendo themselves did have the complete databases and assets available. If they still do, they could donate them to make this genuinely complete. As it stands, this is the best we could do.</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question1">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">How much did you download before Miiverse went down?</span>
                        </h4>
                    </div>
                    <div id="question1" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>We managed to grab 16.97 terabytes of data. That consists of the raw HTML of each post, reply, community page, as well as each image, stored in collections of web archive files (or WARCs)</p>
                            <p>All told, we got:</p>
                            <ul>
                                <li>216,901,986 Replies</li>
                                <li>133,003,599 Posts</li>
                                <li>75,955,135 Screenshots</li>
                                <li>72,135,190 Drawings</li>
                                <li>30,600,505 Avatars</li>
                                <li>8,278,693 User Profiles</li>
                                <li>2,238,830 Deleted and Hidden Posts</li>
                                <li>5,128 Game Communities</li>
                            </ul>
                            <p>This is all available to download on the <a target="_blank" href="https://archive.org/details/@drastic_actions">Internet Archive</a></p>

                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question2">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">Could you turn this into a new social network?</span>
                        </h4>
                    </div>
                    <div id="question2" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>Archiverse is a contraction of "Archive" and "Miiverse." There will be no "new" content posted here. If someone wanted to use the raw data from this archive and turn it into a new Miiverse revival, you might be able to. But, honestly, you would be better off starting fresh.</p>
                            <p>And if you do decide to start one, please, come up with a plan of what to do when your site shuts down. 😉</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question3">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">Nintendo sent me the archive of my account after the shutdown, can I add it to your archive?</span>
                        </h4>
                    </div>
                    <div id="question3" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>This site is a reflection of Archive Team's grab of Miiverse. Everything posted here points back to individual WARC files on Internet Archive. Adding items from those ZIPs would not reflect the state of Miiverse as we got it. </p>
                            <p>Instead, you can upload your ZIPs to something like the <a target="_blank" href="https://archive.org/create/">Internet Archive</a> so that other users can discover them.</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question4">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">I can't find (post, user profile, reply, drawing, screenshot)! Where is it?</span>
                        </h4>
                    </div>
                    <div id="question4" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>There are many reasons (and excuses) for why whatever it is you're looking for is not available. </p>
                            <p>For user accounts, if it was hidden or deleted, there was no way to capture their profile page. In some cases, I could correlate data taken from game community feeds to recreate what their feed and profile may have been. </p>
                            <p>Nintendo created some communities tied to specific events, such as E3. After those events ended, those communities would be hidden, but posts users made were still available on their feeds. I've organized those posts to represent these communities, but we don't have the original pages available.</p>
                            <p>The crawler we created to archive each Miiverse page supported paging through each user and games post feeds. However, this doesn't mean it was perfect. It could only capture what the site itself surfaced so that a post could have been missed during the crawl.</p>
                            <p>What we have captured was the best we could do, given the constraints given.</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question5">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">What happens if Archiverse goes down? Will someone have to archive this site?</span>
                        </h4>
                    </div>
                    <div id="question5" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>Now, you see, I thought about this very issue.  I have open sourced both the <a target="_blank" href="https://archive.org/details/archiverse">data source</a> and this <a target="_blank" href="https://github.com/drasticactions/Archiverse">web front end</a>. So, if anyone wishes to host a mirror or come up with something new based on what I've created, they can.</p>
                            <p>As for if Internet Archive ever goes down (<a target="_blank" href="https://archive.org/donate/">donate here</a>), I will direct you to the Archive Team wiki page on <a target="_blank" href="https://www.archiveteam.org/index.php?title=INTERNETARCHIVE.BAK">this topic</a>.</p>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default ">
                    <div className="panel-heading accordion-toggle question-toggle" data-toggle="collapse" data-parent="#faqAccordion" data-target="#question6">
                        <h4 style={{ fontSize: "x-large" }} className="panel-title">
                            <span style={{ cursor: "pointer" }} className="ing">Who can I contact about Archiverse?</span>
                        </h4>
                    </div>
                    <div id="question6" className="panel-collapse collapse in">
                        <div className="panel-body">
                            <p>You can find me on <a target="_blank" href="https://twitter.com/drasticactionSA">Twitter</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
