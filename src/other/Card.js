import React from 'react';
import {Card, CardMedia, CardContent, CardFloatingMedia} from 'card';
import {Text, Paragraph, Button, Link, Arrow} from 'other';

export default class CardUsage {
  renderSimpleProps() {
    return (
      <Card
        title="My cool title" // What if I want an icon or <Link> in card title?
        content="My epic content" // What if I want multiple paragraphs?
        heroImageSrc="https://" // Can\'t use things like srcset, w/h, etc., cant switch out for video, svg, icon, etc.
      />
    );
  }

  renderComposableMedia() {
    // CardMedia is flush with Card borders
    // CardContent has padding, etc. May have a border if there are multiple adjacent CardContent
    // In theory CardMedia could go above or below CardContent
    return (
      <Card>
        <CardMedia>
          <video src="...">autoplay</video>
        </CardMedia>
        <CardContent>
          <Text lead>Card Title Entry</Text>
          <Paragraph>Proin ut dui sed metus...</Paragraph>
          <Button>Test</Button>
        </CardContent>
      </Card>
    );
  }

  renderComposableFloatingMedia() {
    return (
      <Card>
        <CardContent>
          <CardFloatingMedia float="left">
            <img src="..." alt="img"/>
          </CardFloatingMedia>
          <Text lead>Card Title Entry</Text>
          <Paragraph>Proin ut dui sed metus...</Paragraph>
          <Link>Link to a place <Arrow/></Link>
        </CardContent>
      </Card>
    );
  }

  renderComposableSingleParent() {
    // Single "Card" wrapper, composed internals
    // Issue: Card media would need to style/float/position itself properly
    return (
      <Card>
        <img src="..." alt="img"/>
        <Text lead>Card Title Entry</Text>
        <Paragraph>Proin ut dui sed metus...</Paragraph>
        <Link>Link to a place <Arrow/></Link>
      </Card>
    );
  }

  renderFunctionAsChildren() {
    // Single children-as-function (like downshift)
    // Issue: className is a bit ambiguous here, would be weird to pass through multiple class names
    // Issue: children-as-function doesn't provide much utility here, more useful for complex/stateful components
    return (
      <Card>
        ({className}) => ([
          <img src="..." className={className} alt="img"/>,
          <Text lead>Card Title Entry</Text>,
          <Paragraph>Proin ut dui sed metus...</Paragraph>,
          <Link>Link to a place <Arrow/></Link>,
        ])
      </Card>
    );
  }

  renderRenderProps() {
    // Render props
    // Very flexible, but overly complex for a structural component like Card
    return (
      <Card
        floatingMedia={({className}) => (
          <img src="..." className={className} alt="img"/>
        )}
        title={
          <Text lead>Card Title Entry <Arrow/></Text>
        }
        content={() => ([
          <Paragraph>Proin ut dui sed metus...</Paragraph>,
          <Paragraph>Proin ut dui sed metus...</Paragraph>,
          <Paragraph>Proin ut dui sed metus...</Paragraph>,
        ])}
        action={() => (
          <Link>Link to a place <Arrow/></Link>
        )}
      />
    );
  }

  renderComponentInjection() {
    // Component injeciton
    // Pretty much the same as render props in this case
    // Again very flexible, but overly complex for a structural component like card
    const CustomFloatingMedia = ({className}) => (
      <img src="..." className={className} alt="img"/>
    );
    const CustomTitle = () => (
        <Text lead>Card Title Entry <Arrow/></Text>
    );
    const CustomContent = () => ([
      <Paragraph>Proin ut dui sed metus...</Paragraph>,
      <Paragraph>Proin ut dui sed metus...</Paragraph>,
      <Paragraph>Proin ut dui sed metus...</Paragraph>,
    ]);
    const CustomAction = () => (
          <Link>Link to a place <Arrow/></Link>
    );

    return (
      <Card
        $FloatingMedia={CustomFloatingMedia}
        $Title={CustomTitle}
        $Content={CustomContent}
        $Acion={CustomAction}
      />
    );
  }

}
