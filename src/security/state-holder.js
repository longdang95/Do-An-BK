

export  function createStateHolder(init,modifyState=(state) => state ) {
    let _state = init ;
    let listeners=[];
    return{
        getState(){
            return _state ;
        },
        setState(newState){
            let oldState= _state ;
            _state =  modifyState(newState);
            return Promise.all(listeners.map((l)=> l(_state , oldState)));
        },
        onChange(listener){
            listeners.push(listener);
            return ()=>{
                let i =  listeners.indexOf(listener);
                listeners.splice(i ,1 );
            }
        }

    }
}