import React from 'react';
import classNames from 'classnames';
import './navigation.css';

function Navigation(props) {
    const {
        contentText,
        selectedImg,
        selectItem,
        toLastChapter,
        toNextChapter,
        currentNumber,
        totalNumber,
        images = []
    } = props;

    const lastChapterProps = {
        className: "glyphicon glyphicon-backward",
        title: contentText.lastChapter,
        onClick: () => toLastChapter(currentNumber)
    };
    const currentChapterProps = {
        className: "chapter-current",
        title: contentText.currentChapter
    };
    const nextChapterProps = {
        className: "glyphicon glyphicon-forward",
        title: contentText.nextChapter,
        onClick: () => toNextChapter(currentNumber)
    };
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{contentText.selectImage}</h5>
                <div className="chapter">
                    <span {...lastChapterProps}></span>
                    <span {...currentChapterProps}>{currentNumber}/{totalNumber}</span>
                    <span {...nextChapterProps}></span>
                </div>
            </div>
            <div className="navigation-body">
                <ul className="list-group">
                    {images.map((src, index) => {
                        const listGroupItemProps = {
                            key: index,
                            className: classNames("list-group-item text-right", {
                                "active": selectedImg ? selectedImg === index : index === 0
                            }),
                            onClick: () => selectItem(index)
                        };
                        return (
                            <li {...listGroupItemProps}>
                                <span className="item_position pr-1">{index + 1}</span>
                                <a href="##">
                                    <img src={src} alt={"image_" + index} />
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Navigation;