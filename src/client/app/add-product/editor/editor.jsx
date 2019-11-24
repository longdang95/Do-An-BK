import React from 'react';
import _ from 'lodash'
export class Editor  extends React.Component {
    summerNote = null;
    $editorElem = null;
    componentDidMount(){
        const {height = 400 } =this.props ;
        let _self =  this ;
        $(document).ready(function() {
            _self.summerNote = _self.$editorElem.summernote({
                height,
                callbacks: {
                    onChange: (contents) => {
                        if (!_self.props.onChange) {
                            return;
                        }
                        _self.props.onChange(contents);
                    }
                }

            });
        });
    }
    componentWillUnmount(){
        if(this.summerNote) {
            this.summerNote.summernote('destroy');
            this.summerNote = null;
        }
    }
    render() {
        const {value = '' , onChange , readOnly = false } = this.props ;
        return(
            <div className='editor-wrap'>
                <div
                    className="summernote-wyswyg"

                    ref={elem => this.$editorElem = $(elem)}

                    dangerouslySetInnerHTML={{ __html: this.props.value }}

                ></div>
            </div>
        )
    }
}