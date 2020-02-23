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
        chapterPc,
        images = []
    } = props;

    const lastChapterProps = {
        className: "chapterBtn",
        title: contentText.lastChapter,
        onClick: () => toLastChapter()
    };
    const currentChapterProps = {
        className: "chapter-current",
        title: contentText.currentChapter
    };
    const nextChapterProps = {
        className: "chapterBtn",
        title: contentText.nextChapter,
        onClick: () => toNextChapter()
    };
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{selectedImg}/{images.length}</h5>
                <div className="chapter">
                    <span {...lastChapterProps}>{contentText.lastChapter}</span>
                    <span {...currentChapterProps}>{chapterPc}</span>
                    <span {...nextChapterProps}>{contentText.nextChapter}</span>
                </div>
            </div>
            <div className="navigation-body">
                <ul className="list-group">
                    {images.map((image, index) => {
                        const listGroupItemProps = {
                            key: index,
                            className: classNames("list-group-item text-right", {
                                "active": selectedImg === index + 1
                            }),
                            
                            onClick: () => selectItem(index+1, image.comicTranslationOrderId)
                        };
                        return (
                            <li {...listGroupItemProps}>
                                <span className="item_position pr-1">{index + 1}</span>
                                <a href="##">
                                    <img src={image.thumbnail} alt={"image_" + index} />
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