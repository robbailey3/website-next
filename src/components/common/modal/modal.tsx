/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import styles from './modal.module.scss';

type ModalProps = {
  children?: JSX.Element | JSX.Element[];
  title: string;
  state: 'open' | 'closed';
  className?: string;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { children, title, state, onClose, className } = props;

  return (
    <>
      <div className={clsx(styles.modal, className)}>
        {state === 'open' && (
          <div className={styles.modal__backdrop} onClick={onClose}></div>
        )}
        <dialog open={state === 'open'} className={styles.modal__dialog}>
          <header>
            <h2>{title}</h2>
            <button className={styles.modal__close} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </header>
          <div>{children}</div>
        </dialog>
      </div>
    </>
  );
};

export default Modal;
