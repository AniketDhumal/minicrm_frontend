import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import RuleGroup from './RuleGroup';

const SegmentBuilder = ({ rules, setRules }) => {
  const addNewGroup = () => {
    setRules([...rules, {
      field: 'totalSpent',
      operator: '>',
      value: '',
      condition: 'AND'
    }]);
  };

  const updateRule = (index, updatedRule) => {
    const newRules = [...rules];
    newRules[index] = updatedRule;
    setRules(newRules);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 1, mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Audience Rules
      </Typography>
      
      {rules.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          No rules defined yet
        </Typography>
      ) : (
        rules.map((rule, index) => (
          <RuleGroup
            key={index}
            rule={rule}
            onChange={(updatedRule) => updateRule(index, updatedRule)}
            onRemove={() => removeRule(index)}
            showCondition={index > 0}
          />
        ))
      )}
      
      <Button 
        variant="outlined" 
        onClick={addNewGroup}
        size="small"
        sx={{ mt: 1 }}
      >
        Add Rule
      </Button>
    </Box>
  );
};

export default SegmentBuilder;