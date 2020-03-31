$( document ).ready( () => {

    $( '.tasks-container' ).on( 'click', '.toggle-btn', slideTask );
    $( '.tasks-container' ).on( 'click', '.remove-btn', removeTask );
    $( '.add-task' ).on( 'click', addTask );


} );


function addTask( evt ) {
    evt.preventDefault();

    let taskName = $( `#task-name` );
    let taskDescription = $( `#task-description` );

    if ( taskName.val().trim() === '' || taskDescription.val().trim() === '' ) {
        return;
    }

    $( '.empty-list' ).remove();

    let newTask = `<article class="task">
                            <div class="warp-task-header">
                                <h3 class="task__header">
                                   ${taskName.val()}
                                </h3>
                                <div class="remove-btn"></div>
                                <div class="toggle-btn"></div>
                            </div>
                            <div class="task-description">${taskDescription.val()}</div>
                       </article>`;

    $( newTask ).on( 'click', '.remove-btn', removeTask );
    $( newTask ).on( 'click', '.toggle-btn', slideTask );

    $( '.tasks-container' ).append( $( newTask ) );

    taskName.val( '' );
    taskDescription.val( '' );
}

function slideTask( evt ) {

    if ( evt.target === this ) {
        let marker = $( this );
        let taskDescription = $( this ).parents( '.task' ).children( '.task-description' );

        if ( !marker.hasClass( 'closed' ) ) {
            taskDescription.animate( {
                    minHeight: 0,
                    height: 0
                },
                300,
                function () {
                    $( this ).css( { display: 'none' } );
                    marker.toggleClass( 'closed' );
                } );
        } else {
            taskDescription.css( { display: 'block' } );
            taskDescription.animate( {
                    minHeight: '71px',
                },
                300,
                function () {
                    marker.toggleClass( 'closed' );
                } );
        }
    }
}


function removeTask( evt ) {
    if ( evt.target === this ) {
        $( this ).parents( '.task' ).remove();
        let tasks = $( '.tasks-container' );
        if ( tasks.children().length <= 1 ) {
            let newTask = `<h3 class="empty-list">Список пуст...</h3>`;
            tasks.append( $( newTask ) );
        }
    }
}

