import type { WindowInstance, WindowManager } from "./Window"
import Window from "./Window"
import "../../css/ExtraWindows.css"
import { links } from "../../util/data"
import { FaCommentDots, FaEnvelope, FaUser } from "react-icons/fa"

function ContactWindow(instance: WindowInstance & WindowManager) {
    return (
        <Window {...instance} header={<span>Contact Me</span>}>
            <div className="contact-window">
                <div className="contact-header">
                    <div className="contact-icon">
                        <FaEnvelope />
                    </div>

                    <div>
                        <h3>Connect With Me</h3>
                        <p>
                            Want to get in touch? Fill out the form below
                            or email me directly at{" "}
                            <a href={`mailto:${links.email}`}>
                                {links.email} {" "}
                            </a>
                             or 
                            <a href={`mailto:Aidanhaack05@verizon.net`}>
                                {" "} Aidanhaack05@verizon.net
                            </a>
                        </p>
                    </div>
                </div>

                <ContactForm />
            </div>
        </Window>
    )
}

function ContactForm() {
    return (
        <form className="contact-form" action={`https://formsubmit.co/69d53e9231a6de2f744648835f725029`} method="POST">
            <input type="text" name="_honey" style={{display: "none"}} />

            <input type="hidden" name="_next" value="https://aidanhaack.me/submit" />

            <div className="form-group">
                <label><FaUser /> Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                />
            </div>

            <div className="form-group">
                <label><FaEnvelope /> Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                />
            </div>

            <div className="form-group">
                <label><FaCommentDots /> Message</label>
                <textarea
                    name="message"
                    required
                    placeholder="Your Message..."
                    rows={8}
                />
            </div>

            <button className="send-button" type="submit">
                Send Message
            </button>
        </form>
    )
}

export default ContactWindow