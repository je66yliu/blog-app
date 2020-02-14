import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

import './Post.css';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const Post = ({ title, content, author, date }) => (
    <article className="pv4 bb b--black-10 ph3 ph0-l">
        <div className="flex flex-column flex-row-ns">
            <div className="tl">
                <h1 className="f3 athelas mt0 lh-title wrap">
                    <ResponsiveEllipsis
                        text={title}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                </h1>
                <p className="f5 f4-l lh-copy athelas wrap">
                    <ResponsiveEllipsis
                        className='wrap'
                        text={content}
                        maxLine='3'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                    />
                </p>
            </div>
        </div>
        <p className="tl f6 lh-copy gray mv2">By <span className='fw7'>{author}</span></p>
        <time className="tl f6 db gray">{date}</time>
    </article>
);

export default Post;
