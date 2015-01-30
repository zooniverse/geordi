eventChecker = (event, parameters) ->
  # check event against all parameters (stop as soon as one doesn't match).
  condition = true
  for p of parameters
    if condition
      if parameters.hasOwnProperty(p)
        if parameters[p]
          if p is "start_date"
            condition = condition and (event["time"] >= parameters[p])
          else if p is "end_date"
            condition = condition and (event["time"] <= parameters[p])
          else if [
            "user_id"
            "type"
            "id"
            "subject_id"
            "related_id"
          ].indexOf(p) > -1
            condition = condition and event[p] is parameters[p]
          else
            condition = false
            console.log "Warning: Filter was requested for a non-existent field '" + p + "'. Filtering disabled."
  condition
exports.eventChecker = eventChecker
