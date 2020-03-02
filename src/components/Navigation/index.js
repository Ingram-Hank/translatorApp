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
        chapterIds = [],
        comicChapterId,
        images = [],
        lastChapterDisable,
        nextChapterDisable
    } = props;

    const lastChapterProps = {
        className: classNames("chapterBtn", {"disabled": lastChapterDisable}),
        title: contentText.lastChapter,
        onClick: () => toLastChapter()
    };
    const currentChapterProps = {
        className: "chapter-current",
        title: contentText.currentChapter
    };
    const nextChapterProps = {
        className: classNames("chapterBtn", {"disabled": nextChapterDisable}),
        title: contentText.nextChapter,
        onClick: () => toNextChapter()
    };
    const statusTexts = {
        0: contentText.untranslated,
        1: contentText.translated,
        2: contentText.translatedHasProblem
    };
    const statusColors = {
        0: 'white',
        1: 'green',
        2: "red"
    };
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{chapterPc}</h5>
                <div className="chapter">
                    <span {...lastChapterProps}>{contentText.lastChapter}</span>
                    <span {...currentChapterProps}>{chapterIds.indexOf(comicChapterId)+1}/{chapterIds.length}</span>
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
                        const lightClassName = classNames("light " + statusColors[image.status]);
                        return (
                            <li {...listGroupItemProps}>
                                <div className="item_status">
                                    <span className={lightClassName}></span>
                                    {statusTexts[image.status]}
                                </div>
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