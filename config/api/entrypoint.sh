get_paths(){
    WATCHED_PATHS=""
    local IFS=','
    for file in `echo "$WATCHED_FILES"`
    do
        WATCHED_PATHS="$WATCHED_PATHS /home/node/app/$file"
    done
}

sentences(){
    ERROR=0
    yarn install || ERROR=1
    kill $(pidof node) || echo "NPM se ha detenido"
    rm -rf dist || echo "Borrando dist"
    if [ $ERROR -eq 0 ]
    then
        echo "PROYECTO COMPILADO"
        yarn start:dev
    else
        echo "ERROR AL COMPILAR EL PROYECTO"
    fi
}

notifications(){
    inotifywait -e create -e modify -e move -e delete -r $WATCHED_PATHS
}

init(){
    get_paths
}

wait_changes(){
    echo "==== Esperando nuevos cambios  ===="
    notifications
    echo "===================================\n======   CAMBIO DETECTADO    ======\n==================================="
    sleep 1
    process & wait_changes
}

process(){
    sentences
}

init
process & wait_changes
