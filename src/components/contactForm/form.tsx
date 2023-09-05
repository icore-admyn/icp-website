"use client"
import { useState } from 'react';
import styles from './contact.module.css'
import globalStyles from '../../app/styles/global.module.css'
import classNames from 'classnames';
import Link from 'next/link';

export default function Form() {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        message: '',
        honeypot: '',
        confirmEmail: '',
        checkbox: false,
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (formData.honeypot || formData.confirmEmail) {
            console.log('Spam detected. Aborting submission.');
            return;
        }

        try {
            const response = await fetch(`/api/contact-form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Thank you for submitting your message, a member of our team will be in touch with you shortly!');
                setErrorMessage('');
            } else {
                setErrorMessage('Failed to send message');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred');
            setSuccessMessage('');
            console.error('An error occurred:', error);
        }

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            message: '',
            honeypot: '',
            confirmEmail: '',
            checkbox: false,
        });
    };

    return (
        <form onSubmit={(event: any) => { handleSubmit(event) }} className={classNames(globalStyles.card, styles.form)}>
            {successMessage ? <div className={styles.success}>{successMessage}</div> :
                <div className={styles.formWrapper}>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="first-name">First Name:<span className={globalStyles.redText}>*</span></label>
                        <input id='first-name' name='firstName' type='text' value={formData.firstName} onChange={handleChange} required></input>
                    </div>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="last-name">Last Name:<span className={globalStyles.redText}>*</span></label>
                        <input id='last-name' name='lastName' type='text' value={formData.lastName} onChange={handleChange} required></input>
                    </div>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="name">Email:<span className={globalStyles.redText}>*</span></label>
                        <input id='email' name='email' type='email' value={formData.email} onChange={handleChange} required></input>
                    </div>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="name">Phone:</label>
                        <input id='phone' name='phone' type='phone' value={formData.phone} onChange={handleChange}></input>
                    </div>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="company">Company:<span className={globalStyles.redText}>*</span></label>
                        <input id='company' name='company' type='text' value={formData.company} onChange={handleChange} required></input>
                    </div>
                    <div className={globalStyles.inputWrapper}>
                        <label htmlFor="role">Role:<span className={globalStyles.redText}>*</span></label>
                        <input id='role' name='role' type='text' value={formData.role} onChange={handleChange} required></input>
                    </div>
                    <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        className={styles.honeypot}
                    />
                    <input
                        type="email"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        className={styles.honeypot}
                    />
                    <div className={classNames(
                        globalStyles.inputWrapper,
                        globalStyles.areaWrapper
                    )}>
                        <label htmlFor="message">Message:<span className={globalStyles.redText}>*</span></label>
                        <textarea id='message' name='message' value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <div className={classNames(globalStyles.checkboxWrapper, styles.checkbox)}>
                        <input
                            className={globalStyles.checkbox}
                            type="checkbox"
                            id="checkbox"
                            required
                        ></input>
                        <label
                            className={globalStyles.checkboxText}
                            htmlFor='checkbox'>
                            <p>I agree and consent to the terms presented in the <Link href='/policies/privacy' target='_'>Privacy Policy</Link> and the <Link href='/policies/terms' target='_'>Terms & Conditions</Link>.</p>
                        </label>
                    </div>
                    <button className={globalStyles.formButton} type='submit'>Send Message</button>
                </div>}
            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </form>
    )
}
