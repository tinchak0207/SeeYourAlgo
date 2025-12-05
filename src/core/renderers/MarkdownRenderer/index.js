import React from 'react';
import { Renderer } from 'core/renderers';
import styles from './MarkdownRenderer.module.scss';
import ReactMarkdown from 'react-markdown';

class MarkdownRenderer extends Renderer {
  renderData() {
    const { markdown } = this.props.data;

    const headingComponents = [
      props => <h1 {...props}>{props.children}</h1>,
      props => <h2 {...props}>{props.children}</h2>,
      props => <h3 {...props}>{props.children}</h3>,
      props => <h4 {...props}>{props.children}</h4>,
      props => <h5 {...props}>{props.children}</h5>,
      props => <h6 {...props}>{props.children}</h6>,
    ];

    const heading = ({ level, children, ...rest }) => {
      const index = Math.min(Math.max(level, 1), headingComponents.length) - 1;
      const HeadingComponent = headingComponents[index];

      const idfy = text => text.toLowerCase().trim().replace(/[^\w \-]/g, '').replace(/ /g, '-');

      const getText = children => {
        return React.Children.map(children, child => {
          if (!child) return '';
          if (typeof child === 'string') return child;
          if ('props' in child) return getText(child.props.children);
          return '';
        }).join('');
      };

      const id = idfy(getText(children));

      return (
        <HeadingComponent id={id} {...rest}>
          {children}
        </HeadingComponent>
      );
    };

    const link = ({ href, children, ...rest }) => {
      if (/^#/.test(href)) {
        return (
          <a href={href} {...rest}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} rel="noreferrer noopener" target="_blank" {...rest}>
          {children}
        </a>
      );
    };

    const image = ({ src, ...rest }) => {
      let newSrc = src;
      let style = { maxWidth: '100%' };
      const CODECOGS = 'https://latex.codecogs.com/svg.latex?';
      const WIKIMEDIA_IMAGE = 'https://upload.wikimedia.org/wikipedia/';
      const WIKIMEDIA_MATH = 'https://wikimedia.org/api/rest_v1/media/math/render/svg/';
      if (src.startsWith(CODECOGS)) {
        const latex = src.substring(CODECOGS.length);
        newSrc = `${CODECOGS}\\color{White}${latex}`;
      } else if (src.startsWith(WIKIMEDIA_IMAGE)) {
        style.backgroundColor = 'white';
      } else if (src.startsWith(WIKIMEDIA_MATH)) {
        style.filter = 'invert(100%)';
      }
      return <img src={newSrc} style={style} {...rest} />;
    };

    return (
      <div className={styles.markdown}>
        <ReactMarkdown className={styles.content} source={markdown} renderers={{ heading, link, image }}
                       escapeHtml={false}/>
      </div>
    );
  }
}

export default MarkdownRenderer;

