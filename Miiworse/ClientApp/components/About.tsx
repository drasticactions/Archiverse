import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

export class About extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div style={{  marginBottom: "5px" }} className="post post-content">
                <h1 style={{ marginTop: "10px" }}>About Archiverse</h1>
            </div>
            <div className="post post-content home">
                <p><b>On August 29th, 2017,</b> Nintendo announced its intentions to shut down its Wii U and 3DS social network, Miiverse. They gave users two months to get their posts, their drawings, and their screenshots copied from the site. Also, if requested, they offered an archive of a their content to be received after the shutdown. However, they did not include replies (both on their posts and comments made on other users posts).</p>
                <p>Archive Team felt this was not sufficient. We could do better. And in that span of time grabbed:</p>
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
                <p>
                    Altogether, totaling <b>approximately 17 terabytes</b> of data. All of these archives are available on the <a target="_blank" href="https://archive.org/details/@drastic_actions">Internet Archive</a> and the <a target="_blank" href="https://web.archive.org/web/20171107021006/https://miiverse.nintendo.net/">Wayback Machine</a>. While this was a good start, more work was needed. The Wayback Machine doesn't handle Miiverse's pages very well; pagination is not supported, making navigation all but impossible. Unless you have the explicit URL for a post, it is not readily accessible nor discoverable.
            </p>
                <p>
                    Enter Archiverse.
            </p>
                <p>
                    I created Archiverse as a way to be a guide into the Miiverse archives. Here, you can view everything we at Archive Team grabbed in a more convenient form: Every post, every reply, every drawing, every screenshot. Search for  <Link to="posts?gameId=14866558073036866822&orderDateDesc=true">communities hidden away by Nintendo</Link>, rediscover your <Link to="posts?gameId=14866558073673172583&sortEmpathy=desc&isDrawingOnly=true">favorite works of art</Link>, find out just how many Miiverse users were in Montserrat <Link to="/users?country=Montserrat&sortPosts=desc">(it's 58)</Link>. Each post links back to the WARC if you want to find the original HTML it was pulled from.
            </p>
                <p>Archiverse itself is <a href="https://github.com/drasticactions/Archiverse">open source</a>: If you want to mirror the site, contribute to this front end site, or do more intensive analytics with a <a href="https://archive.org/details/archiverse">copy of the database</a> on your local machine, you can do so. </p>
                <p>So dive in, check out what Miiverse had to offer, and what Nintendo threw away on November 8th, 2017.</p>
                <p>- Drastic Actions</p>
            </div>
        </div>;
    }
}
