import React from "react";
import classnames from "classnames";
import $ from 'jquery'
export class Modal extends React.Component {
    overlayElem = null;

    lastScrollTop;

    constructor(props) {
        super(props);
        this.state = {};

        this.lastScrollTop = $(window).scrollTop();


        $("html").css({"overflow": "hidden"})

    };

    componentWillUnmount() {
        $("html").css({"overflow": ""})

    }


    render() {
        const {className, onDismiss, content, cantKickOut} = this.props;

        return (
            <div className={className}>
                <div className="app-modal">
                    <div
                        className="app-modal-overlay"
                        onMouseDown={(e) => e.target == this.overlayElem && !cantKickOut && onDismiss()}
                        onTouchStart={(e) => e.target == this.overlayElem && !cantKickOut && onDismiss()}
                        ref={(elem) => this.overlayElem = elem}
                    >
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}