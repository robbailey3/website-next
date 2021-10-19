// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<noscript>
						<iframe
							title="google-tag-manager"
							src="https://www.googletagmanager.com/ns.html?id=GTM-M8FTHPW"
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
