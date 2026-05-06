#ifndef ADD_COMMAND_H
#define ADD_COMMAND_H

class AddCommand: public ICommand {
// TODO: Merge with AE-12 Branch
public:
void execute() override;
virtual ~AddCommand() {}

};

#endif

