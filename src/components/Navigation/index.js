import React from 'react';
import classNames from 'classnames';
import './navigation.css';

function Navigation(props) {
    const {
        contentText,
        selectedImg,
        selectItem,
        handlerSelectChapter,
        chapterPc,
        chapterIds = [],
        comicChapterId,
        images = []
    } = props;
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
    const currentChapter = chapterIds.filter(item => item.id === comicChapterId);
    const chapterDescription = currentChapter.length > 0 && currentChapter[0].name;
    return (
        <div className="navigation">
            <div className="navigation-header text-center">
                <h5>{chapterPc}</h5>
                <div className="chapter">
                    <button className='btn btn-default dropdown-toggle' data-toggle='dropdown' title={contentText.selectChapter}>
                        <span className='selectedChapter'>{chapterDescription}</span>
                        <span className='caret-content'>
                            <span className='caret'></span>
                        </span>
                    </button>
                    <ul className='dropdown-menu'>
                        {chapterIds.map((item, index) => {
                            const listItemProps = {
                                key: index,
                                onClick: ()=> handlerSelectChapter(item.id)
                            };
                            return (
                                <li {...listItemProps}>{item.name}</li>
                            )
                        })}
                    </ul>
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
                                    <img src={image.thumbnail} crossOrigin="anonymous" alt={"image_" + index} />
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