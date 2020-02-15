import React from 'react';

const PostPreview = ({ title, content, author, date }) => (
    <article className="pv4 bb b--black-10 ph3 ph0-l">
        <div className="flex flex-column flex-row-ns">
            <div className="tl">
                <h1 className="f3 athelas mt0 lh-title">
                    {title}
                </h1>
                <p className="f5 f4-l lh-copy athelas">
                    {content}
                </p>
            </div>
        </div>
        <p className="tl f6 lh-copy gray mv2">By <span className='fw7'>{author}</span></p>
        <time className="tl f6 db gray">{date}</time>
    </article>
);

export default PostPreview;
