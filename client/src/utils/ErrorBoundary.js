import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        // On met à jour l’état afin que le prochain rendu affiche
        // l’UI de remplacement.
        return { hasError: true };
    };

    componentDidCatch(error, info) {

        this.setState({hasError : true })

        //objet avec une propriété componentStack contenant des informations sur le composant qui a levé l’erreur.
        console.log("componentDidCatch_info", info.componentStack, this.state.hasError);
        //error - L’erreur qui a été levée.
        console.log("componentDidCatch_error", error, this.state.hasError);

    }


    render () {
        if(this.state.hasError){
            return <div>Attention , quelque chose ne va pas</div>; 
        }else{
            return this.props.children
        }
       
    }
}

export default ErrorBoundary


/**
 * 
 * Les périmètres d’erreurs (error boundaries) sont des composants React 
 * qui interceptent toute erreur JavaScript survenant dans l’arbre de composants 
 * de leurs enfants, loguent ces erreurs, et affichent une UI de remplacement au lieu 
 * de l’arbre de composants qui a planté.

 */