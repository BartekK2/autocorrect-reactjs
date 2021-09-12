import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    marginTop:25,
    marginBottom:25,
  },
  bullet: {
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function CardTemplate(props) {
  const classes = useStyles();
  const {title, type, description, learnmore } = props; // unpacking props
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {type}
        </Typography>

        <Accordion style={{'margin':'20px 0'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
                <Typography className={classes.heading}>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{description}</Typography>
            </AccordionDetails>
        </Accordion>
        {props.children}
      </CardContent>
      <CardActions>
        <Button size="small" target="_blank" href={learnmore}>Link to <GitHubIcon style={{'margin':'0 7px','font-size':'inheritive'}}></GitHubIcon> repo</Button>
      </CardActions>
    </Card>
  );
}