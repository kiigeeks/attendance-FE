import ReactDOM from'react-dom'
import PropTypes from 'prop-types';

const BackdropOverlay = () => {
    return (
        <div className='fixed top-0 left-0 w-full min-h-screen h-full z-40 bg-black/75' />
    )
}

const ModalOverlay = ( props ) => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center'>
            <div className='bg-white rounded-lg shadow-lg text-gray-900 mx-2'>
                { props.children }
            </div>
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.object,
}

const portalElement = document.getElementById('modal')

const Modal = ( props ) => {
  return (
    <>
        {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{ props.children }</ModalOverlay>, portalElement)}
    </>
  )
}

Modal.propTypes = {
    children: PropTypes.object,
}

export default Modal