#ifndef HELP_COMMAND_H
#define HELP_COMMAND_H

class HelpCommand: public ICommand {
// TODO: Implement the interface logic 
public:
void execute(const Command& cmd) override;
virtual ~HelpCommand() {}

};

#endif
